#!/usr/bin/env python3
"""Minimal MQTT 3.1.1 client, stdlib only. QoS 0 pub/sub. Enough for the
Cloud PC desktop bridge: no pip, no signup, works against public brokers."""
import socket
import struct
import time


def _enc_str(s):
    b = s.encode("utf-8")
    return struct.pack("!H", len(b)) + b


def _enc_len(n):
    out = bytearray()
    while True:
        d = n % 128
        n //= 128
        if n:
            d |= 0x80
        out.append(d)
        if not n:
            break
    return bytes(out)


def _packet(ptype, flags, body):
    return bytes([(ptype << 4) | flags]) + _enc_len(len(body)) + body


class MQTTClient:
    def __init__(self, host, port=1883, client_id=None, keepalive=60):
        self.host, self.port = host, port
        self.client_id = client_id or ("cloudpc-%d" % int(time.time() * 1000) % 100000)
        self.keepalive = keepalive
        self.sock = None
        self._buf = b""

    def connect(self, timeout=15):
        self.sock = socket.create_connection((self.host, self.port), timeout)
        body = (_enc_str("MQTT") + bytes([4, 0x02]) +
                struct.pack("!H", self.keepalive) + _enc_str(self.client_id))
        self.sock.sendall(_packet(1, 0, body))
        ptype, body = self._read_packet(timeout)
        if ptype != 2 or len(body) < 2 or body[1] != 0:
            raise RuntimeError("MQTT connect refused: %r" % (body,))
        self._last_ping = time.time()

    def subscribe(self, topic):
        pid = 1
        body = struct.pack("!H", pid) + _enc_str(topic) + bytes([0])
        self.sock.sendall(_packet(8, 2, body))

    def publish(self, topic, payload):
        if isinstance(payload, str):
            payload = payload.encode("utf-8")
        body = _enc_str(topic) + payload
        self.sock.sendall(_packet(3, 0, body))

    def _read_packet(self, timeout):
        self.sock.settimeout(timeout)
        while len(self._buf) < 2:
            chunk = self.sock.recv(4096)
            if not chunk:
                raise RuntimeError("broker closed connection")
            self._buf += chunk
        ptype = self._buf[0] >> 4
        mult, length, i = 1, 0, 1
        while True:
            b = self._buf[i]
            i += 1
            length += (b & 127) * mult
            mult *= 128
            if not b & 128:
                break
        while len(self._buf) < i + length:
            chunk = self.sock.recv(65536)
            if not chunk:
                raise RuntimeError("broker closed mid-packet")
            self._buf += chunk
        body = self._buf[i:i + length]
        self._buf = self._buf[i + length:]
        return ptype, body

    def _handle(self, on_message):
        try:
            ptype, body = self._read_packet(1.0)
        except socket.timeout:
            return
        if ptype == 3:  # PUBLISH
            tlen = struct.unpack("!H", body[:2])[0]
            topic = body[2:2 + tlen].decode("utf-8", "replace")
            payload = body[2 + tlen:]
            on_message(topic, payload)
        # PINGRESP(13), SUBACK(9) etc: ignored

    def loop_forever(self, on_message, stop_check=None):
        while True:
            if stop_check and stop_check():
                break
            if time.time() - self._last_ping > self.keepalive * 0.7:
                self.sock.sendall(_packet(12, 0, b""))
                self._last_ping = time.time()
            self._handle(on_message)

    def close(self):
        try:
            self.sock.sendall(_packet(14, 0, b""))
            self.sock.close()
        except Exception:
            pass
