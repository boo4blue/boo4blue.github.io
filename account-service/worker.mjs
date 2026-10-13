const SESSION_SECONDS = 60 * 60 * 24 * 30;
const PASSWORD_ITERATIONS = 210_000;
const MAX_BODY_BYTES = 750_000;
const encoder = new TextEncoder();

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers }
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get('origin') || '';
  const allowed = new Set([env.APP_ORIGIN, 'http://localhost:8000', 'http://127.0.0.1:8000'].filter(Boolean));
  if (!allowed.has(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
    'access-control-allow-headers': 'authorization, content-type, x-owner-setup-token',
    'access-control-max-age': '86400',
    vary: 'Origin'
  };
}

function base64url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64url(bytes);
}

async function sha256(value) {
  return base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));
}

async function passwordHash(password, salt) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations: PASSWORD_ITERATIONS }, material, 256);
  return base64url(new Uint8Array(bits));
}

function safeUser(user) {
  return { id: user.id, email: user.email, username: user.username, isOwner: Boolean(user.is_owner), createdAt: user.created_at };
}

async function readJson(request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_BODY_BYTES) throw new Error('Request is too large.');
  const raw = await request.text();
  if (encoder.encode(raw).byteLength > MAX_BODY_BYTES) throw new Error('Request is too large.');
  return JSON.parse(raw || '{}');
}

async function authenticate(request, env) {
  const token = request.headers.get('authorization')?.match(/^Bearer\s+([A-Za-z0-9_-]{32,})$/i)?.[1];
  if (!token) return null;
  const tokenHash = await sha256(token);
  const row = await env.DB.prepare(`SELECT u.id, u.email, u.username, u.is_owner, u.created_at
    FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?`).bind(tokenHash, Math.floor(Date.now() / 1000)).first();
  return row || null;
}

async function createSession(user, env) {
  const token = randomToken();
  const expiry = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  await env.DB.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256(token), user.id, expiry).run();
  return { token, expiresAt: new Date(expiry * 1000).toISOString() };
}

async function register(request, env) {
  const body = await readJson(request);
  const email = String(body.email || '').trim().toLowerCase();
  const username = String(body.username || '').trim().toLowerCase();
  const password = String(body.password || '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json({ error: 'Enter a valid email address.' }, 400);
  if (!/^[a-z0-9_]{3,24}$/.test(username)) return json({ error: 'Username must be 3–24 letters, numbers, or underscores.' }, 400);
  if (password.length < 12 || password.length > 256) return json({ error: 'Password must be at least 12 characters.' }, 400);
  const ownerCandidate = email === String(env.OWNER_EMAIL || '').trim().toLowerCase() &&
    Boolean(env.OWNER_SETUP_TOKEN) && request.headers.get('x-owner-setup-token') === env.OWNER_SETUP_TOKEN;
  const ownerExists = await env.DB.prepare('SELECT id FROM users WHERE is_owner = 1 LIMIT 1').first();
  if (ownerCandidate && ownerExists) return json({ error: 'The owner account has already been claimed.' }, 409);
  const id = crypto.randomUUID();
  const salt = randomToken();
  const hash = await passwordHash(password, salt);
  try {
    await env.DB.prepare('INSERT INTO users (id, email, username, password_salt, password_hash, is_owner) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(id, email, username, salt, hash, ownerCandidate ? 1 : 0).run();
  } catch {
    return json({ error: 'That email or username is already registered.' }, 409);
  }
  const user = await env.DB.prepare('SELECT id, email, username, is_owner, created_at FROM users WHERE id = ?').bind(id).first();
  return json({ user: safeUser(user), ...(await createSession(user, env)) }, 201);
}

async function login(request, env) {
  const body = await readJson(request);
  const identity = String(body.identity || '').trim().toLowerCase();
  const password = String(body.password || '');
  const user = await env.DB.prepare(`SELECT id, email, username, password_salt, password_hash, is_owner, created_at
    FROM users WHERE email = ? OR username = ? LIMIT 1`).bind(identity, identity).first();
  if (!user || !password || await passwordHash(password, user.password_salt) !== user.password_hash) {
    return json({ error: 'Email, username, or password is incorrect.' }, 401);
  }
  return json({ user: safeUser(user), ...(await createSession(user, env)) });
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);
    try {
      if (request.method === 'GET' && url.pathname === '/health') return json({ ok: true, service: 'kin-account-api' }, 200, cors);
      if (request.method === 'POST' && url.pathname === '/auth/register') return await register(request, env).then((r) => withCors(r, cors));
      if (request.method === 'POST' && url.pathname === '/auth/login') return await login(request, env).then((r) => withCors(r, cors));
      if (request.method === 'POST' && url.pathname === '/auth/logout') {
        const token = request.headers.get('authorization')?.match(/^Bearer\s+([A-Za-z0-9_-]{32,})$/i)?.[1];
        if (token) await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256(token)).run();
        return json({ ok: true }, 200, cors);
      }
      if (url.pathname === '/account/data' && ['GET', 'PUT'].includes(request.method)) {
        const user = await authenticate(request, env);
        if (!user) return json({ error: 'Please sign in again.' }, 401, cors);
        if (request.method === 'GET') {
          const row = await env.DB.prepare('SELECT payload, updated_at FROM account_data WHERE user_id = ?').bind(user.id).first();
          return json({ user: safeUser(user), payload: row ? JSON.parse(row.payload) : null, updatedAt: row?.updated_at || null }, 200, cors);
        }
        const body = await readJson(request);
        const payload = JSON.stringify(body.payload ?? null);
        if (encoder.encode(payload).byteLength > MAX_BODY_BYTES) return json({ error: 'Your saved studio is too large to sync.' }, 413, cors);
        await env.DB.prepare(`INSERT INTO account_data (user_id, payload, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(user_id) DO UPDATE SET payload = excluded.payload, updated_at = CURRENT_TIMESTAMP`).bind(user.id, payload).run();
        return json({ ok: true, updatedAt: new Date().toISOString() }, 200, cors);
      }
      return json({ error: 'Not found.' }, 404, cors);
    } catch (error) {
      if (error instanceof SyntaxError) return json({ error: 'Request body must be valid JSON.' }, 400, cors);
      return json({ error: 'The account service could not complete this request.' }, 500, cors);
    }
  }
};

function withCors(response, headers) {
  const merged = new Headers(response.headers);
  for (const [name, value] of Object.entries(headers)) merged.set(name, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: merged });
}
