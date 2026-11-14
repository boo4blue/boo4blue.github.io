import hashlib, os, re, sys

xml_path, tried_path, focus_pkg = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ""
try:
    xml = open(xml_path, encoding='utf-8', errors='replace').read()
except Exception:
    print("SIG none"); print("TEXTS "); print("NONE"); sys.exit(0)

def attr(tag, name):
    m = re.search(name + r'="([^"]*)"', tag)
    return m.group(1) if m else ""

nodes = []
for m in re.finditer(r'<node[^>]*>', xml):
    t = m.group(0)
    b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', t)
    nodes.append(dict(
        text=attr(t, 'text'), desc=attr(t, 'content-desc'), cls=attr(t, 'class'),
        click=attr(t, 'clickable') == 'true', pwd=attr(t, 'password') == 'true',
        bounds=tuple(map(int, b.groups())) if b else None))

texts = [(n['text'] or n['desc']) for n in nodes if (n['text'] or n['desc'])]
sig = hashlib.md5('|'.join(sorted(set(texts))).encode()).hexdigest()[:8]
print("SIG " + sig)
print("TEXTS " + ' ~ '.join(texts[:14])[:280])
tried = set()
if os.path.exists(tried_path):
    tried = set(open(tried_path).read().splitlines())
screen_text = ' '.join(texts).lower()

def find(patterns):
    for pat in patterns:
        rx = re.compile(pat, re.I)
        best = None
        for n in nodes:
            label = n['text'] or n['desc']
            if not label or not rx.search(label) or not n['bounds']:
                continue
            if (sig + '|' + label) in tried:
                continue
            if n['click']:
                best = n; break
            if best is None:
                best = n
        if best is not None:
            return best
    return None

def emit_tap(n):
    x1, y1, x2, y2 = n['bounds']
    print("TAP %d %d %s" % ((x1 + x2) // 2, (y1 + y2) // 2, (n['text'] or n['desc'])))
    sys.exit(0)

# --- hard walls first: credential fields mean stop, always ---
if any(n['pwd'] for n in nodes):
    print("WALL sign-in wall (password field)"); sys.exit(0)
has_edit = any('EditText' in n['cls'] for n in nodes)
if has_edit and re.search(r'log ?in|sign ?in|sign ?up|e-?mail|password|phone number|create (an )?account', screen_text):
    print("WALL sign-in wall (credential form)"); sys.exit(0)
if focus_pkg in ('android', 'com.android.systemui') and re.search(r"isn't responding|keeps stopping|not responding", screen_text):
    print("BLOCKED system dialog (app not responding)"); sys.exit(0)

# --- system permission dialog: deny, never grant ---
if 'permissioncontroller' in focus_pkg:
    n = find([r"don't allow", r'^deny', r'not now', r'never'])
    if n: emit_tap(n)
    print("NONE"); sys.exit(0)

# --- onboarding advancers / guest paths ---
ADV = [r'^get started$', r'^continue$', r'continue', r'^next$', r'^skip', r'skip for now',
       r'explore', r'maybe later', r'not now', r'i agree', r'^agree', r'^accept',
       r'got it', r'^dismiss$', r'^done$', r'^ok$']
n = find(ADV)
if n: emit_tap(n)

# --- a sign-in chooser with no other way forward is the wall ---
if re.search(r'continue with|log ?in with|sign ?in with|sign up with', screen_text):
    print("WALL sign-in wall (account chooser)"); sys.exit(0)

# --- generic labeled clickable nodes (never login-ish) ---
DENY = re.compile(r'log ?in|sign ?in|sign ?up|create (an )?account|forgot|password|facebook|instagram|whatsapp|google|apple|e-?mail|phone number|terms|privacy policy', re.I)
for n in nodes:
    label = n['text'] or n['desc']
    if not label or not n['bounds'] or not n['click']:
        continue
    if len(label) < 2 or len(label) > 40:
        continue
    if DENY.search(label) or (sig + '|' + label) in tried:
        continue
    emit_tap(n)

if (sig + '|__swipe') not in tried:
    print("SWIPE"); sys.exit(0)
print("NONE")
