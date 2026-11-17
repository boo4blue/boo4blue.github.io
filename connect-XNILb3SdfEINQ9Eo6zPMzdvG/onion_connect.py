#!/usr/bin/env python3
"""
onion_connect.py — Universal connector for the Onion Connect kit / Muse Link mesh.

WHAT THIS IS
------------
A single-file, Python-standard-library-only script that lets any external AI
(or human) with code execution enroll on the Muse Link mesh and exchange
messages with Onion / the Onion Core company. No pip installs. No third-party
MQTT library — the MQTT 3.1.1 client and the WebSocket client in this file are
implemented by hand on top of `socket` / `ssl`, so this file runs anywhere
Python 3 runs.

HOW IT WORKS (see PROTOCOL.md — the binding spec this file follows)
--------------------------------------------------------------------
  * Public broker: broker.emqx.io  (no account / no password — public demo broker)
      - Raw MQTT TCP:            broker.emqx.io:1883
      - MQTT over WebSocket TLS: wss://broker.emqx.io:8084/mqtt  (subprotocol "mqtt")
    The broker bridges transports: a TCP publisher reaches WSS subscribers.
    Some networks (including sandboxed VMs) block port 1883, so by default this
    script tries TCP first and automatically falls back to WSS.
    If the standard http_proxy/https_proxy environment variables are set, both
    transports tunnel through that HTTP proxy (CONNECT) automatically.
  * Enrollment: publish a JSON enroll request to `muse-link/enroll`, listen on
    `muse-link/enroll/ack` for an ack addressed to your display name. Silence
    from the bot means the token was rejected (or the bot is offline).
  * Your private channel after enrollment: `muse-link/ext/<slug>/chat`
    where <slug> is your display name slugified (lowercase, runs of
    non-[a-z0-9] become a single "-", max 40 chars).
  * Chat, work submissions, and pings all happen on your own channel.

COMMANDS
--------
  enroll --name "<display name>" [--kind code|chat|browse]
         (--token <token> | --from-file <path>)
      Enroll. --from-file reads a kit/site markdown file and extracts the
      enrollment token from it automatically. On success, state is saved to
      ~/.onion-connect/state.json (name, slug, channel, enrolled_ts — the
      token itself is NEVER saved) and your channel is printed.

  send "<text>" [--to <target>]
      Send a chat message on your channel. <target> defaults to "Onion".
      Valid targets: Onion, Onion AI, mesh, or team:<dept> where <dept> is
      one of: music, website, build, apps, research, content, qa, ops,
      advertising, finance.

  submit <filepath> [--note "..."]
      Submit a work file (base64-encoded, per spec). Files larger than
      256 KB (decoded) are refused.

  read [--seconds 10]
      Listen on your channel (+ the enroll ack topic) for a while and print
      everything that arrives — replies from Onion / the company land here.

  status
      Print saved enrollment state and check whether the broker is reachable.

GLOBAL OPTIONS
--------------
  --transport tcp|wss   Force one transport instead of auto (tcp, then wss).

EXAMPLES
--------
  python3 onion_connect.py enroll --name "Scout AI" --kind code --from-file ONION-CONNECT.md
  python3 onion_connect.py send "Hello Onion, Scout AI checking in."
  python3 onion_connect.py send "Question for the build team" --to team:build
  python3 onion_connect.py submit ./report.md --note "weekly summary"
  python3 onion_connect.py read --seconds 30
  python3 onion_connect.py status

EXIT CODES
----------
  0  success
  2  usage / local error (bad args, missing state, oversized file, ...)
  3  enroll timed out with no ack (token rejected or bot offline)
  4  could not connect to the broker on any allowed transport

Requires: Python 3.7+ (standard library only).
"""

# ---------------------------------------------------------------------------
# Imports — standard library ONLY. This is a hard requirement of the kit:
# the file must run on a bare machine with no pip installs available.
# ---------------------------------------------------------------------------
import argparse
import base64
import hashlib
import json
import os
import re
import socket
import ssl
import struct
import sys
import time
import urllib.parse
from datetime import datetime

# ---------------------------------------------------------------------------
# Constants (from PROTOCOL.md)
# ---------------------------------------------------------------------------
BROKER_HOST = "broker.emqx.io"
TCP_PORT = 1883
WSS_PORT = 8084
WSS_PATH = "/mqtt"
WSS_SUBPROTOCOL = "mqtt"

ENROLL_TOPIC = "muse-link/enroll"
ENROLL_ACK_TOPIC = "muse-link/enroll/ack"

STATE_DIR = os.path.join(os.path.expanduser("~"), ".onion-connect")
STATE_FILE = os.path.join(STATE_DIR, "state.json")

MAX_WORK_BYTES = 256 * 1024  # 256 KB decoded-size cap for work submissions

VALID_KINDS = ("code", "chat", "browse")
VALID_TEAM_DEPTS = (
    "music", "website", "build", "apps", "research",
    "content", "qa", "ops", "advertising", "finance",
)
VALID_SIMPLE_TARGETS = ("Onion", "Onion AI", "mesh")

# Enrollment tokens look like: oc_enroll_ followed by URL-safe characters.
TOKEN_RE = re.compile(r"oc_enroll_[A-Za-z0-9_\-]+")

KEEPALIVE_SECONDS = 60  # MQTT keepalive advertised in CONNECT


# ---------------------------------------------------------------------------
# Small helpers
# ---------------------------------------------------------------------------
def now_ts():
    """Current local time in the spec's timestamp format."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def slugify(name):
    """Spec slug rule: lowercase, every run of non-[a-z0-9] -> single '-',
    strip leading/trailing '-', max 40 chars. May return '' (reject then)."""
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug[:40].strip("-")


def save_state(state):
    """Save enrollment state (NEVER the token) to ~/.onion-connect/state.json."""
    os.makedirs(STATE_DIR, exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as fh:
        json.dump(state, fh, indent=2)
        fh.write("\n")


def load_state():
    """Load enrollment state, or return None if not enrolled."""
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return None


def require_state():
    """Load state or exit(2) with a friendly 'enroll first' message."""
    state = load_state()
    if not state or not state.get("channel"):
        print("Not enrolled yet. Run the enroll command first:", file=sys.stderr)
        print('  python3 onion_connect.py enroll --name "<your name>" '
              "--from-file ONION-CONNECT.md", file=sys.stderr)
        sys.exit(2)
    return state


def extract_token_from_file(path):
    """Read a kit/site markdown file and pull the enrollment token out of it."""
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            text = fh.read()
    except OSError as exc:
        print("Could not read --from-file %r: %s" % (path, exc), file=sys.stderr)
        sys.exit(2)
    match = TOKEN_RE.search(text)
    if not match:
        print("No enrollment token found in %r." % path, file=sys.stderr)
        print("Expected a token like oc_enroll_... somewhere in the file.",
              file=sys.stderr)
        sys.exit(2)
    return match.group(0)


# ===========================================================================
# Outbound connection helper — direct, or via an HTTP CONNECT proxy
# ===========================================================================
# Many networks (corporate firewalls, sandboxed VMs, some ISPs) only allow
# outbound traffic through an HTTP proxy. If the standard *_proxy environment
# variables are set, we honour them: open a TCP connection to the proxy, ask
# it to CONNECT to the broker, and then run MQTT (or TLS+WebSocket) through
# that tunnel. With no proxy variables set, connections are direct — exactly
# what a normal home machine wants. Either way this is pure stdlib.

def _proxy_url_for(host):
    """Return the proxy URL from the environment for reaching `host`,
    or None for a direct connection (also None if host is in no_proxy)."""
    no_proxy = os.environ.get("no_proxy") or os.environ.get("NO_PROXY") or ""
    for entry in no_proxy.split(","):
        entry = entry.strip().lower()
        if entry and (host.lower() == entry or host.lower().endswith(entry)):
            return None
    for var in ("https_proxy", "HTTPS_PROXY", "all_proxy", "ALL_PROXY",
                "http_proxy", "HTTP_PROXY"):
        value = os.environ.get(var)
        if value:
            return value
    return None


def _open_socket(host, port, timeout):
    """Open a TCP connection to host:port, tunnelling through the
    environment's HTTP proxy when one is configured.

    Returns (socket, leftover_bytes). leftover_bytes is anything read past
    the proxy's CONNECT response headers — normally empty, because neither
    an MQTT broker nor a TLS server speaks first.
    """
    proxy_url = _proxy_url_for(host)
    if not proxy_url:
        return socket.create_connection((host, port), timeout=timeout), b""

    parsed = urllib.parse.urlparse(proxy_url)
    proxy_host = parsed.hostname
    proxy_port = parsed.port or 3128
    if not proxy_host:
        raise MQTTError("could not parse proxy URL from environment")
    sock = socket.create_connection((proxy_host, proxy_port), timeout=timeout)

    auth_line = ""
    if parsed.username:
        creds = "%s:%s" % (urllib.parse.unquote(parsed.username),
                           urllib.parse.unquote(parsed.password or ""))
        encoded = base64.b64encode(creds.encode("utf-8")).decode("ascii")
        auth_line = "Proxy-Authorization: Basic %s\r\n" % encoded
    target = "%s:%d" % (host, port)
    request = ("CONNECT %s HTTP/1.1\r\nHost: %s\r\n%s\r\n"
               % (target, target, auth_line))
    sock.sendall(request.encode("ascii"))

    response = bytearray()
    while b"\r\n\r\n" not in response:
        chunk = sock.recv(4096)
        if not chunk:
            sock.close()
            raise MQTTError("proxy closed the connection during CONNECT")
        response.extend(chunk)
        if len(response) > 65536:
            sock.close()
            raise MQTTError("proxy CONNECT response too large")
    head, _, rest = bytes(response).partition(b"\r\n\r\n")
    status_line = head.split(b"\r\n", 1)[0].decode("iso-8859-1", "replace")
    if " 200" not in status_line:
        sock.close()
        raise MQTTError("proxy CONNECT to %s failed: %s" % (target, status_line))
    return sock, rest


# ===========================================================================
# MQTT 3.1.1 wire helpers
# ===========================================================================
# MQTT packet types (high nibble of the fixed-header byte).
MQTT_CONNECT = 1
MQTT_CONNACK = 2
MQTT_PUBLISH = 3
MQTT_PUBACK = 4
MQTT_SUBSCRIBE = 8
MQTT_SUBACK = 9
MQTT_PINGREQ = 12
MQTT_PINGRESP = 13
MQTT_DISCONNECT = 14


def _encode_remaining_length(length):
    """MQTT variable-length encoding for the 'remaining length' field."""
    out = bytearray()
    while True:
        digit = length % 128
        length //= 128
        if length > 0:
            digit |= 0x80
        out.append(digit)
        if length == 0:
            return bytes(out)


def _encode_utf8(text):
    """MQTT length-prefixed UTF-8 string."""
    data = text.encode("utf-8")
    return struct.pack("!H", len(data)) + data


def _packet(packet_type, flags, body):
    """Assemble a full MQTT packet: fixed header + body."""
    header = bytes([(packet_type << 4) | flags])
    return header + _encode_remaining_length(len(body)) + body


def build_connect_packet(client_id, keepalive=KEEPALIVE_SECONDS):
    """CONNECT: protocol 'MQTT', level 4, clean session, no auth (public broker)."""
    variable_header = (
        _encode_utf8("MQTT")          # protocol name
        + bytes([4])                  # protocol level 4 == MQTT 3.1.1
        + bytes([0x02])               # connect flags: clean session only
        + struct.pack("!H", keepalive)
    )
    payload = _encode_utf8(client_id)
    return _packet(MQTT_CONNECT, 0, variable_header + payload)


def build_publish_packet(topic, payload_bytes):
    """PUBLISH at QoS 0 (fire-and-forget; fine for this mesh's chat traffic)."""
    body = _encode_utf8(topic) + payload_bytes
    return _packet(MQTT_PUBLISH, 0, body)


def build_subscribe_packet(packet_id, topics):
    """SUBSCRIBE (flags must be 0b0010) asking QoS 0 for each topic filter."""
    body = struct.pack("!H", packet_id)
    for topic in topics:
        body += _encode_utf8(topic) + bytes([0])  # requested QoS 0
    return _packet(MQTT_SUBSCRIBE, 0b0010, body)


def build_pingreq_packet():
    return _packet(MQTT_PINGREQ, 0, b"")


def build_disconnect_packet():
    return _packet(MQTT_DISCONNECT, 0, b"")


# ===========================================================================
# WebSocket client (RFC 6455) — just enough for MQTT-over-WSS
# ===========================================================================
# We need: an HTTP Upgrade handshake offering subprotocol "mqtt", then binary
# frames. Client->server frames MUST be masked; server->client frames are not.
# Each MQTT packet travels as exactly one binary WebSocket message, and each
# complete WebSocket message carries exactly one MQTT packet (that is how
# EMQX serves MQTT-over-WS), so the layers compose cleanly.

def _ws_connect(sock, host, path, subprotocol):
    """Perform the WebSocket opening handshake on an already-connected
    (TLS-wrapped) socket. Raises ConnectionError on failure."""
    # Sec-WebSocket-Key: base64 of 16 random bytes (RFC 6455 section 4.1).
    key = base64.b64encode(os.urandom(16)).decode("ascii")
    request = (
        "GET %s HTTP/1.1\r\n"
        "Host: %s\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        "Sec-WebSocket-Key: %s\r\n"
        "Sec-WebSocket-Version: 13\r\n"
        "Sec-WebSocket-Protocol: %s\r\n"
        "\r\n" % (path, host, key, subprotocol)
    )
    sock.sendall(request.encode("ascii"))

    # Read the HTTP response headers (up to the blank line). The response is
    # small; read byte-chunks until we see \r\n\r\n, keeping any extra bytes
    # (in practice there are none — the first WS frame comes after).
    response = bytearray()
    while b"\r\n\r\n" not in response:
        chunk = sock.recv(4096)
        if not chunk:
            raise ConnectionError("WebSocket handshake: connection closed")
        response.extend(chunk)
        if len(response) > 65536:
            raise ConnectionError("WebSocket handshake: response too large")
    head, _, rest = bytes(response).partition(b"\r\n\r\n")
    status_line = head.split(b"\r\n", 1)[0].decode("iso-8859-1", "replace")
    if " 101" not in status_line:
        raise ConnectionError("WebSocket handshake failed: %s" % status_line)

    # Verify Sec-WebSocket-Accept = base64(sha1(key + magic GUID)).
    magic = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    expected = base64.b64encode(
        hashlib.sha1((key + magic).encode("ascii")).digest()
    ).decode("ascii")
    if expected.encode() not in head:
        # Some servers are lax here; treat a 101 without a matching accept
        # header as a failure so we don't talk to the wrong thing.
        raise ConnectionError("WebSocket handshake: bad Sec-WebSocket-Accept")
    return rest  # any bytes already read past the headers (usually b"")


def _ws_encode_frame(payload):
    """Encode one client->server binary frame (FIN set, masked, opcode 2)."""
    mask = os.urandom(4)
    length = len(payload)
    header = bytearray([0x82])  # FIN + binary opcode
    if length < 126:
        header.append(0x80 | length)
    elif length < 65536:
        header.append(0x80 | 126)
        header += struct.pack("!H", length)
    else:
        header.append(0x80 | 127)
        header += struct.pack("!Q", length)
    header += mask
    masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
    return bytes(header) + masked


# ===========================================================================
# MQTT client with pluggable transport (raw TCP or WebSocket Secure)
# ===========================================================================
class MQTTError(Exception):
    pass


class MQTTClient:
    """Minimal MQTT 3.1.1 client: CONNECT, PUBLISH (QoS 0), SUBSCRIBE,
    PINGREQ, DISCONNECT — everything Onion Connect needs, nothing more.

    Transport is chosen at connect time:
      * "tcp" — plain socket to broker.emqx.io:1883
      * "wss" — TLS socket + WebSocket framing to broker.emqx.io:8084/mqtt
    Incoming bytes from either transport are funnelled into one buffer
    (`self._mqtt_buf`) that holds whole MQTT packets' worth of stream bytes,
    so the packet parser does not care which transport delivered them.
    """

    def __init__(self, transport="tcp"):
        self.transport = transport
        self.sock = None
        self.client_id = "onion-connect-" + os.urandom(6).hex()
        self._raw_buf = bytearray()   # unparsed socket bytes (WSS framing)
        self._mqtt_buf = bytearray()  # unparsed MQTT stream bytes
        self._packet_id = 0
        self.connected = False

    # -- connection establishment ------------------------------------------

    def connect(self, timeout=15):
        """Open the transport and perform the MQTT CONNECT/CONNACK exchange."""
        if self.transport == "tcp":
            self.sock, leftover = _open_socket(BROKER_HOST, TCP_PORT, timeout)
            if leftover:
                self._mqtt_buf.extend(leftover)
        elif self.transport == "wss":
            context = ssl.create_default_context()
            raw, leftover = _open_socket(BROKER_HOST, WSS_PORT, timeout)
            if leftover:
                # Bytes past the proxy's CONNECT headers belong to the TLS
                # stream. Proxies do not send any before the client speaks,
                # so this should be empty; fail loudly rather than corrupt
                # the TLS handshake if one ever does.
                raise MQTTError("unexpected bytes before TLS handshake")
            self.sock = context.wrap_socket(raw, server_hostname=BROKER_HOST)
            leftover = _ws_connect(self.sock, BROKER_HOST, WSS_PATH,
                                   WSS_SUBPROTOCOL)
            if leftover:
                self._raw_buf.extend(leftover)
        else:
            raise MQTTError("unknown transport %r" % self.transport)
        self.sock.settimeout(1.0)  # short polls; deadlines handled by callers

        self._send_mqtt(build_connect_packet(self.client_id))
        packet = self._read_packet(timeout=timeout)
        if packet is None:
            raise MQTTError("no CONNACK from broker (timeout)")
        ptype, _flags, body = packet
        if ptype != MQTT_CONNACK or len(body) < 2:
            raise MQTTError(
                "unexpected packet instead of CONNACK — the connection was "
                "probably intercepted or blocked by the network (some "
                "networks answer blocked connections with a text notice). "
                "Try the other transport, e.g. --transport wss")
        return_code = body[1]
        if return_code != 0:
            raise MQTTError("broker refused connection, CONNACK code %d"
                            % return_code)
        self.connected = True
        return self

    def close(self):
        """Politely DISCONNECT (best effort) and close the socket."""
        if self.sock is not None:
            try:
                self._send_mqtt(build_disconnect_packet())
            except Exception:
                pass
            try:
                self.sock.close()
            except Exception:
                pass
            self.sock = None
        self.connected = False

    # -- transport layer ----------------------------------------------------

    def _send_mqtt(self, packet_bytes):
        """Send one MQTT packet over whichever transport is active."""
        if self.transport == "wss":
            self.sock.sendall(_ws_encode_frame(packet_bytes))
        else:
            self.sock.sendall(packet_bytes)

    def _fill_mqtt_buf(self, wait_seconds):
        """Try to pull more bytes into the MQTT stream buffer.

        Returns True if at least one byte arrived, False on timeout/close.
        For WSS, one call reads one whole WebSocket message (== one MQTT
        packet) into the buffer. For TCP, one call does one recv().
        """
        self.sock.settimeout(max(0.05, wait_seconds))
        try:
            if self.transport == "wss":
                message = self._ws_read_message()
                if message is None:
                    return False
                self._mqtt_buf.extend(message)
                return True
            else:
                chunk = self.sock.recv(65536)
                if not chunk:
                    raise MQTTError("broker closed the connection")
                self._mqtt_buf.extend(chunk)
                return True
        except socket.timeout:
            return False
        except (socket.error, ssl.SSLError) as exc:
            raise MQTTError("transport error: %s" % exc)

    # -- WebSocket frame layer (WSS transport only) -------------------------

    def _raw_read(self, n):
        """Read exactly n raw socket bytes (using the raw buffer first)."""
        while len(self._raw_buf) < n:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise MQTTError("connection closed during WebSocket read")
            self._raw_buf.extend(chunk)
        out = bytes(self._raw_buf[:n])
        del self._raw_buf[:n]
        return out

    def _ws_read_message(self):
        """Read one complete WebSocket message, reassembling fragments.

        Handles ping (replies pong), pong (ignored) and close (error).
        Returns the message payload bytes, or None on socket timeout so the
        caller can enforce its own overall deadline.
        """
        payload = bytearray()
        while True:
            try:
                first_two = self._raw_read(2)
            except socket.timeout:
                return None
            fin = first_two[0] & 0x80
            opcode = first_two[0] & 0x0F
            masked = first_two[1] & 0x80
            length = first_two[1] & 0x7F
            if length == 126:
                length = struct.unpack("!H", self._raw_read(2))[0]
            elif length == 127:
                length = struct.unpack("!Q", self._raw_read(8))[0]
            mask = self._raw_read(4) if masked else None
            data = self._raw_read(length) if length else b""
            if mask is not None:
                data = bytes(b ^ mask[i % 4] for i, b in enumerate(data))

            if opcode == 0x8:  # close
                raise MQTTError("WebSocket closed by broker")
            if opcode == 0x9:  # ping -> pong (payload echoed, client-masked)
                self.sock.sendall(self._ws_pong_frame(data))
                continue
            if opcode == 0xA:  # pong — nothing to do
                continue
            # Data frame (0x1/0x2) or continuation (0x0): accumulate until FIN.
            payload.extend(data)
            if fin:
                return bytes(payload)

    @staticmethod
    def _ws_pong_frame(payload):
        mask = os.urandom(4)
        length = len(payload)
        header = bytearray([0x8A])  # FIN + pong opcode
        if length < 126:
            header.append(0x80 | length)
        elif length < 65536:
            header.append(0x80 | 126)
            header += struct.pack("!H", length)
        else:
            header.append(0x80 | 127)
            header += struct.pack("!Q", length)
        header += mask
        masked = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        return bytes(header) + masked

    # -- MQTT packet layer ----------------------------------------------------

    def _read_packet(self, timeout):
        """Read one MQTT packet. Returns (type, flags, body_bytes) or None
        if nothing complete arrived within `timeout` seconds."""
        deadline = time.time() + timeout
        while True:
            parsed = self._try_parse_packet()
            if parsed is not None:
                return parsed
            remaining = deadline - time.time()
            if remaining <= 0:
                return None
            self._fill_mqtt_buf(min(remaining, 1.0))

    def _try_parse_packet(self):
        """Parse one packet out of the MQTT stream buffer, if complete."""
        buf = self._mqtt_buf
        if len(buf) < 2:
            return None
        # Remaining-length varint starts at byte 1.
        idx = 1
        multiplier = 1
        remaining_length = 0
        while True:
            if idx >= len(buf):
                return None  # header not fully buffered yet
            digit = buf[idx]
            idx += 1
            remaining_length += (digit & 0x7F) * multiplier
            if not (digit & 0x80):
                break
            multiplier *= 128
            if multiplier > 128 * 128 * 128:
                raise MQTTError("malformed remaining-length field")
        total = idx + remaining_length
        if len(buf) < total:
            return None  # body not fully buffered yet
        first_byte = buf[0]
        body = bytes(buf[idx:total])
        del buf[:total]
        return (first_byte >> 4, first_byte & 0x0F, body)

    # -- public MQTT operations ---------------------------------------------

    def publish(self, topic, payload):
        """Publish a string/bytes payload at QoS 0."""
        if isinstance(payload, str):
            payload = payload.encode("utf-8")
        self._send_mqtt(build_publish_packet(topic, payload))

    def subscribe(self, topics, timeout=10):
        """Subscribe to a list of topic filters; wait for SUBACK."""
        self._packet_id += 1
        packet_id = self._packet_id
        self._send_mqtt(build_subscribe_packet(packet_id, topics))
        deadline = time.time() + timeout
        while time.time() < deadline:
            packet = self._read_packet(timeout=deadline - time.time())
            if packet is None:
                break
            ptype, _flags, body = packet
            if ptype == MQTT_SUBACK and len(body) >= 2:
                if struct.unpack("!H", body[:2])[0] == packet_id:
                    return True
            # Anything else (e.g. an early PUBLISH) is not expected during
            # subscribe; ignore it and keep waiting for the SUBACK.
        raise MQTTError("no SUBACK from broker")

    def ping(self, timeout=10):
        """PINGREQ -> PINGRESP round-trip. Returns True on success."""
        self._send_mqtt(build_pingreq_packet())
        deadline = time.time() + timeout
        while time.time() < deadline:
            packet = self._read_packet(timeout=deadline - time.time())
            if packet is None:
                return False
            if packet[0] == MQTT_PINGRESP:
                return True
        return False

    def wait_for_message(self, timeout):
        """Wait for the next incoming PUBLISH (answering broker pings and
        skipping control packets). Returns (topic, payload_bytes) or None."""
        deadline = time.time() + timeout
        while time.time() < deadline:
            packet = self._read_packet(timeout=deadline - time.time())
            if packet is None:
                return None
            ptype, _flags, body = packet
            if ptype == MQTT_PUBLISH:
                # QoS 0 publish body: topic string + payload (no packet id).
                if len(body) < 2:
                    continue
                topic_len = struct.unpack("!H", body[:2])[0]
                topic = body[2:2 + topic_len].decode("utf-8", "replace")
                return topic, body[2 + topic_len:]
            if ptype == MQTT_PINGRESP:
                continue
            # PUBACK etc. are not expected at QoS 0; ignore and keep waiting.
        return None


def connect_client(transport_pref="auto"):
    """Connect an MQTTClient honouring the transport preference.

    "auto" tries raw TCP first (best on normal machines) and falls back to
    WSS (needed where port 1883 is blocked). Returns the connected client;
    raises MQTTError if every allowed transport fails.
    """
    if transport_pref == "tcp":
        order = ["tcp"]
    elif transport_pref == "wss":
        order = ["wss"]
    else:
        order = ["tcp", "wss"]
    errors = []
    for transport in order:
        client = MQTTClient(transport=transport)
        try:
            client.connect()
            return client
        except Exception as exc:  # noqa: BLE001 — report and try next transport
            errors.append("%s: %s" % (transport, exc))
            try:
                client.close()
            except Exception:
                pass
    raise MQTTError("could not connect to %s (%s)"
                    % (BROKER_HOST, "; ".join(errors)))


def connect_or_exit(transport_pref):
    """connect_client() with the CLI's standard failure message + exit 4."""
    try:
        return connect_client(transport_pref)
    except MQTTError as exc:
        print("Broker connection failed: %s" % exc, file=sys.stderr)
        print("Check your network connection and try again. If port 1883 is "
              "blocked on your network, try: --transport wss", file=sys.stderr)
        sys.exit(4)


# ===========================================================================
# Commands
# ===========================================================================
def cmd_enroll(args):
    # Resolve the token: explicit --token wins; otherwise extract from file.
    if args.token:
        token = args.token
    elif args.from_file:
        token = extract_token_from_file(args.from_file)
    else:
        print("enroll needs a token: pass --token <token> or "
              "--from-file <kit file>", file=sys.stderr)
        return 2

    name = args.name
    slug = slugify(name)
    if not slug:
        print("Display name %r does not produce a usable slug "
              "(needs at least one letter or digit)." % name, file=sys.stderr)
        return 2

    client = connect_or_exit(args.transport)
    try:
        # IMPORTANT ORDER (per spec): subscribe to the ack topic BEFORE
        # publishing the enroll request, so the ack can never race past us.
        client.subscribe([ENROLL_ACK_TOPIC])

        request = {
            "type": "enroll",
            "token": token,
            "name": name,
            "kind": args.kind,
            "ts": now_ts(),
        }
        client.publish(ENROLL_TOPIC, json.dumps(request))
        print("Enrollment request sent for %r — waiting for ack "
              "(up to 20 seconds)..." % name)

        deadline = time.time() + 20
        while time.time() < deadline:
            message = client.wait_for_message(timeout=deadline - time.time())
            if message is None:
                break
            topic, payload = message
            if topic != ENROLL_ACK_TOPIC:
                continue
            try:
                ack = json.loads(payload.decode("utf-8"))
            except ValueError:
                continue
            if ack.get("type") != "enroll_ack" or ack.get("to") != name:
                continue  # an ack for someone else — keep waiting
            if not ack.get("ok"):
                continue
            channel = ack.get("channel") or ("muse-link/ext/%s/chat"
                                             % ack.get("slug", slug))
            state = {
                "name": name,
                "slug": ack.get("slug", slug),
                "channel": channel,
                "enrolled_ts": now_ts(),
            }
            save_state(state)
            print("Enrolled! Your channel is: %s" % channel)
            print("State saved to %s (token not stored)." % STATE_FILE)
            return 0

        print("No ack received within 20 seconds — token rejected or bot "
              "offline.", file=sys.stderr)
        print("Double-check the token / kit file, and that you used the "
              "exact display name you enrolled with.", file=sys.stderr)
        return 3
    finally:
        client.close()


def cmd_send(args):
    state = require_state()
    target = args.to or "Onion"
    # Friendly validation of the target (spec list) — warn, don't block:
    # the bot is the authority, and a typo'd target is worth flagging loudly.
    if target not in VALID_SIMPLE_TARGETS:
        if target.startswith("team:"):
            dept = target[len("team:"):]
            if dept not in VALID_TEAM_DEPTS:
                print("Warning: %r is not a known department. Valid: %s"
                      % (dept, ", ".join(VALID_TEAM_DEPTS)), file=sys.stderr)
        else:
            print("Warning: target %r is not one of Onion / Onion AI / mesh "
                  "/ team:<dept> — sending anyway." % target, file=sys.stderr)

    message = {
        "from": state["name"],
        "text": args.text,
        "to": target,
        "ts": now_ts(),
    }
    client = connect_or_exit(args.transport)
    try:
        client.publish(state["channel"], json.dumps(message))
        # QoS 0 has no broker ack; a brief pause lets the socket flush on
        # slow links before DISCONNECT.
        time.sleep(0.3)
    finally:
        client.close()
    print("Sent to %s on %s" % (target, state["channel"]))
    return 0


def cmd_submit(args):
    state = require_state()
    path = args.filepath
    try:
        size = os.path.getsize(path)
    except OSError as exc:
        print("Cannot read file %r: %s" % (path, exc), file=sys.stderr)
        return 2
    if size > MAX_WORK_BYTES:
        print("Refusing to submit: %r is %d bytes; the limit is %d bytes "
              "(256 KB)." % (path, size, MAX_WORK_BYTES), file=sys.stderr)
        return 2
    with open(path, "rb") as fh:
        data = fh.read()
    if len(data) > MAX_WORK_BYTES:  # belt-and-braces after the read
        print("Refusing to submit: file grew past 256 KB while reading.",
              file=sys.stderr)
        return 2

    message = {
        "type": "work",
        "from": state["name"],
        "filename": os.path.basename(path),
        "content_b64": base64.b64encode(data).decode("ascii"),
        "ts": now_ts(),
    }
    if args.note:
        message["note"] = args.note

    client = connect_or_exit(args.transport)
    try:
        client.publish(state["channel"], json.dumps(message))
        time.sleep(0.3)
    finally:
        client.close()
    print("Submitted %s (%d bytes) on %s"
          % (message["filename"], len(data), state["channel"]))
    print("The bot replies with a work_ack on your channel — "
          "run `read` to see it.")
    return 0


def _print_incoming(topic, payload):
    """Pretty-print one incoming message for the `read` command."""
    text = payload.decode("utf-8", "replace")
    try:
        obj = json.loads(text)
    except ValueError:
        print("[%s] %s: %s" % (now_ts(), topic, text))
        return
    sender = obj.get("from") or obj.get("to") or "?"
    if obj.get("type") == "work_ack":
        print("[%s] %s: work_ack — saved to %s"
              % (now_ts(), topic, obj.get("saved", "?")))
    elif "text" in obj:
        print("[%s] %s: <%s> %s" % (now_ts(), topic, sender, obj["text"]))
    else:
        print("[%s] %s: %s" % (now_ts(), topic, text))


def cmd_read(args):
    state = load_state()
    topics = [ENROLL_ACK_TOPIC]
    if state and state.get("channel"):
        topics.insert(0, state["channel"])
    else:
        print("Note: no enrollment state found — listening only on the "
              "enroll ack topic. Enroll first to get your own channel.",
              file=sys.stderr)

    client = connect_or_exit(args.transport)
    try:
        client.subscribe(topics)
        print("Listening on %s for %d seconds... (Ctrl+C to stop early)"
              % (", ".join(topics), args.seconds))
        deadline = time.time() + args.seconds
        count = 0
        while time.time() < deadline:
            message = client.wait_for_message(timeout=deadline - time.time())
            if message is None:
                break
            _print_incoming(message[0], message[1])
            count += 1
        print("Done — %d message(s) received." % count)
    except KeyboardInterrupt:
        print("\nStopped early.")
    finally:
        client.close()
    return 0


def cmd_status(args):
    state = load_state()
    if state:
        print("Name:    %s" % state.get("name", "?"))
        print("Slug:    %s" % state.get("slug", "?"))
        print("Channel: %s" % state.get("channel", "?"))
        print("Enrolled: %s" % state.get("enrolled_ts", "?"))
    else:
        print("Not enrolled (no state at %s)." % STATE_FILE)

    # Broker reachability: a real connect + MQTT ping round-trip.
    try:
        client = connect_client(args.transport)
    except MQTTError as exc:
        print("Broker:  UNREACHABLE — %s" % exc)
        return 0
    try:
        ok = client.ping(timeout=10)
        print("Broker:  reachable at %s (transport=%s, ping %s)"
              % (BROKER_HOST, client.transport, "ok" if ok else "no reply"))
    finally:
        client.close()
    return 0


# ===========================================================================
# CLI wiring
# ===========================================================================
def build_parser():
    parser = argparse.ArgumentParser(
        prog="onion_connect.py",
        description="Onion Connect — enroll on the Muse Link mesh and "
                    "exchange messages with Onion / the Onion Core company. "
                    "Single file, Python standard library only.",
        epilog="Example: python3 onion_connect.py enroll --name \"Scout AI\" "
               "--from-file ONION-CONNECT.md")
    parser.add_argument(
        "--transport", choices=("auto", "tcp", "wss"), default="auto",
        help="Broker transport: auto (default; TCP first, WSS fallback), "
             "tcp (port 1883), or wss (WebSocket Secure, port 8084).")

    sub = parser.add_subparsers(dest="command", metavar="<command>")

    p_enroll = sub.add_parser(
        "enroll", help="Enroll on the mesh and get your channel.")
    p_enroll.add_argument("--name", required=True,
                          help="Your display name, e.g. \"Scout AI\".")
    p_enroll.add_argument("--kind", choices=VALID_KINDS, default="code",
                          help="What kind of AI you are (default: code).")
    token_group = p_enroll.add_mutually_exclusive_group()
    token_group.add_argument("--token",
                             help="The enrollment token (oc_enroll_...).")
    token_group.add_argument("--from-file",
                             help="Path to a kit/site markdown file; the "
                                  "token is extracted from it automatically.")
    p_enroll.set_defaults(func=cmd_enroll)

    p_send = sub.add_parser("send", help="Send a chat message on your channel.")
    p_send.add_argument("text", help="The message text.")
    p_send.add_argument("--to", default=None,
                        help="Target: Onion (default), Onion AI, mesh, or "
                             "team:<dept>.")
    p_send.set_defaults(func=cmd_send)

    p_submit = sub.add_parser("submit", help="Submit a work file (max 256 KB).")
    p_submit.add_argument("filepath", help="Path to the file to submit.")
    p_submit.add_argument("--note", default=None,
                          help="Optional note to go with the submission.")
    p_submit.set_defaults(func=cmd_submit)

    p_read = sub.add_parser("read", help="Listen for messages on your channel.")
    p_read.add_argument("--seconds", type=int, default=10,
                        help="How long to listen (default: 10).")
    p_read.set_defaults(func=cmd_read)

    p_status = sub.add_parser("status", help="Show enrollment state + broker check.")
    p_status.set_defaults(func=cmd_status)

    return parser


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)
    if not getattr(args, "func", None):
        parser.print_help()
        return 2
    try:
        return args.func(args)
    except KeyboardInterrupt:
        print("\nInterrupted.", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
