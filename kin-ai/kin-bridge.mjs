#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const root = path.resolve(process.env.KIN_WORKSPACE || process.cwd());
const token = process.env.KIN_BRIDGE_TOKEN || '';
const port = Number(process.env.KIN_BRIDGE_PORT || 8787);
const allowed = (request) => !token || request.headers.authorization === `Bearer ${token}`;
const safePath = (value = '.') => {
  const target = path.resolve(root, value);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) throw new Error('Path is outside the configured workspace.');
  return target;
};
const body = async (request) => { let text = ''; for await (const chunk of request) text += chunk; return text ? JSON.parse(text) : {}; };
const send = (response, status, payload) => { response.writeHead(status, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type, authorization' }); response.end(JSON.stringify(payload)); };
const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  if (!allowed(request)) return send(response, 401, { error: 'Bridge token required.' });
  try {
    if (request.method === 'GET' && request.url === '/health') return send(response, 200, { ok: true, workspace: root, tools: ['workspace.list', 'workspace.read', 'workspace.write', 'terminal.run'] });
    const payload = await body(request);
    if (request.method === 'POST' && request.url === '/workspace/list') return send(response, 200, { path: payload.path || '.', entries: await fs.readdir(safePath(payload.path), { withFileTypes: true }).then((entries) => entries.map((entry) => ({ name: entry.name, type: entry.isDirectory() ? 'directory' : 'file' }))) });
    if (request.method === 'POST' && request.url === '/workspace/read') return send(response, 200, { path: payload.path, content: await fs.readFile(safePath(payload.path), 'utf8') });
    if (request.method === 'POST' && request.url === '/workspace/write') { await fs.writeFile(safePath(payload.path), String(payload.content || ''), 'utf8'); return send(response, 200, { ok: true, path: payload.path }); }
    if (request.method === 'POST' && request.url === '/terminal/run') { if (!payload.command) return send(response, 400, { error: 'command is required' }); const [program, ...args] = String(payload.command).trim().split(/\s+/); const result = await exec(program, args, { cwd: safePath(payload.cwd || '.'), timeout: Math.min(Number(payload.timeout || 30000), 120000), maxBuffer: 2 * 1024 * 1024 }); return send(response, 200, { ok: true, stdout: result.stdout, stderr: result.stderr }); }
    return send(response, 404, { error: 'Unknown bridge route.' });
  } catch (error) { return send(response, 500, { error: error.message }); }
});
server.listen(port, '127.0.0.1', () => console.log(`Kin bridge listening on http://127.0.0.1:${port}\nWorkspace: ${root}\nSet KIN_BRIDGE_TOKEN to require a token.`));
