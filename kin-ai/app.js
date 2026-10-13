const STORE_KEY = 'kin.studio.v1';
const KEY_SESSION = 'kin.runtime.key';
const LOCAL_MODEL_KEY = 'kin.local-model.cached';
const LOCAL_MODEL_ID = 'onnx-community/Qwen2.5-0.5B-Instruct';
const LOCAL_MODEL_NAME = 'Kin Local Quick';
const MAX_PACKAGE_BYTES = 512 * 1024;
const ROUTES = [
  ['home', 'Overview', 'home'], ['builder', 'AI Builder', 'spark'], ['model', 'Model Lab', 'cpu'], ['memory', 'Memory', 'memory'],
  ['capabilities', 'Capabilities', 'plug'], ['run', 'Run your AI', 'chat'], ['runtime', 'Runtime', 'cpu'], ['library', 'My builds', 'layers']
];
const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',
  memory: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  plug: '<path d="M9 7V3m6 4V3M7 7h10v5a5 5 0 0 1-10 0V7Zm5 10v4"/>',
  chat: '<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.2-.7L4 20l1.7-4.2a7.5 7.5 0 1 1 14.3-4.3Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 9h6v6H9zM9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  upload: '<path d="M12 16V4m-5 5 5-5 5 5"/><path d="M4 16v4h16v-4"/>',
  trash: '<path d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  download: '<path d="M12 4v12m-5-5 5 5 5-5"/><path d="M4 20h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  bolt: '<path d="m13 2-3 9h7L9 22l2-9H5l8-11Z"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20"/>',
  sliders: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  flower: '<path d="M12 12c-5-7-9-2-5 1-4 3 0 8 5 1 5 7 9 2 5-1 4-3 0-8-5-1Z"/><circle cx="12" cy="12" r="1.5"/>'
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const timeLabel = (date) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(date));

function freshState() {
  const now = new Date().toISOString();
  const modelConfig = { foundation: 'Local open model', family: LOCAL_MODEL_ID, architecture: 'Conversational assistant', context: '8192', modalities: ['text'], memory: 'Long-term memory', toolPolicy: 'Ask before using tools', autonomy: 'Confirm writes', learning: 'Prompt + examples', frame: ['conversation', 'memory', 'tool-router', 'safety'] };
  const agentConfig = { reasoning: 'balanced', maxSteps: 8, approval: 'ask-before-write', bridgeUrl: '', terminal: false, filesystem: false };
  return {
    activeBuildId: 'nova',
    builds: [{ id: 'nova', name: 'Nova', role: 'A thoughtful everyday copilot', agents: [], agentConfig, model: LOCAL_MODEL_ID, runtime: LOCAL_MODEL_NAME, runtimeConfig: { mode: 'local', provider: LOCAL_MODEL_NAME, endpoint: '', model: LOCAL_MODEL_ID }, modelConfig, temperature: 0.7, memoryEnabled: true, systemPrompt: 'You are Nova, a thoughtful everyday copilot. Be warm, clear, curious, and practical. Remember what matters to the person you are helping. Ask one useful question when it would improve your answer.', createdAt: now, updatedAt: now }],
    memories: [], capabilities: [],
    runtime: { provider: 'OpenAI-compatible', endpoint: '', model: 'llama3.2' },
    settings: { compact: false }
  };
}
function readState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY));
    if (parsed && Array.isArray(parsed.builds) && parsed.builds.length) {
      const restored = { ...freshState(), ...parsed };
      restored.builds = restored.builds.map((build) => {
        const defaults = freshState().builds[0];
        const merged = { ...defaults, ...build, agents: Array.isArray(build.agents) ? build.agents : [], agentConfig: { ...defaults.agentConfig, ...(build.agentConfig || {}) }, modelConfig: { ...defaults.modelConfig, ...(build.modelConfig || {}) } };
        if (!merged.runtimeConfig?.endpoint && merged.runtimeConfig?.mode !== 'cloud') merged.runtimeConfig = { ...defaults.runtimeConfig };
        return merged;
      });
      const ownerId = restored.activeBuildId || restored.builds[0].id;
      restored.memories = (restored.memories || []).map((entry) => ({ ...entry, buildId: entry.buildId || ownerId }));
      restored.capabilities = (restored.capabilities || []).map((entry) => ({ ...entry, buildId: entry.buildId || ownerId }));
      return restored;
    }
  } catch (error) { console.warn('Could not load saved studio state', error); }
  return freshState();
}
let state = readState();
let currentPage = 'home';
let chatMessages = [];
let isSending = false;
let modalType = '';
let modalData = null;
let localModelPhase = localStorage.getItem(LOCAL_MODEL_KEY) === 'true' ? 'cached' : 'missing';
let localModelProgress = { label: '', percent: 0, hasPercent: false };
let localModelDevice = '';
let modelWorker = null;
let modelLoadPromise = null;
let modelLoadResolve = null;
let modelLoadReject = null;
let generationRequest = null;
let thinkingTimer = null;
const root = document.querySelector('#app');

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (error) { toast('Could not save: storage may be full. Remove a large package and try again.', true); }
}
function activeBuild() { return state.builds.find((build) => build.id === state.activeBuildId) || state.builds[0]; }
function memoriesFor(build = activeBuild()) { return state.memories.filter((entry) => entry.buildId === build.id); }
function capabilitiesFor(build = activeBuild()) { return state.capabilities.filter((entry) => entry.buildId === build.id); }
function runtimeFor(build = activeBuild()) { return build.runtimeConfig || state.runtime; }
function cloudRuntimeFor(build = activeBuild()) { const runtime = runtimeFor(build); return runtime.cloud || runtime; }
function keyFor(build = activeBuild()) { return `${KEY_SESSION}.${build.id}`; }
function runtimeMode(build = activeBuild()) { const runtime = runtimeFor(build); return runtime.mode || (runtime.endpoint?.trim() ? 'cloud' : 'local'); }
function runtimeReady(build = activeBuild()) { return runtimeMode(build) === 'cloud' ? Boolean(runtimeFor(build).endpoint?.trim()) : localModelPhase === 'ready'; }
function assignedAgent(build, content) {
  const agents = Array.isArray(build.agents) ? build.agents : [];
  if (!agents.length) return null;
  const words = new Set(String(content).toLowerCase().match(/[a-z0-9]{3,}/g) || []);
  let best = agents[0]; let bestScore = 0;
  for (const agent of agents) {
    const terms = new Set(`${agent.name} ${agent.focus} ${agent.keywords}`.toLowerCase().match(/[a-z0-9]{3,}/g) || []);
    const score = [...terms].reduce((total, word) => total + (words.has(word) ? 1 : 0), 0);
    if (score > bestScore) { best = agent; bestScore = score; }
  }
  return { ...best, matched: bestScore > 0 };
}
function activityMarkup(message) {
  if (!message.agentName) return '';
  const label = message.activityStatus === 'complete' ? 'Done' : message.activityStatus === 'error' ? 'Needs attention' : message.activityStatus === 'stopped' ? 'Stopped' : 'In progress';
  const finalStep = message.activityStatus === 'complete' ? 'Reply complete' : message.activityStatus === 'error' ? 'Could not finish this reply' : message.activityStatus === 'stopped' ? 'Reply stopped' : 'Preparing your reply…';
  return `<details class="agent-activity"><summary><span>Thinking · ${escapeHTML(message.agentName)} · ${label}</span><span class="activity-expand">View activity</span></summary><div class="activity-body"><div><strong>Assigned task</strong><p>${escapeHTML(message.activityTask || 'Respond to the latest message.')}</p><p class="agent-focus-line">${escapeHTML(message.agentName)} · ${escapeHTML(message.agentFocus || 'General specialist')}</p><p class="agent-focus-line">${escapeHTML(message.activityRouting || '')}</p></div><ol><li class="activity-done">Read your message</li><li class="activity-done">${escapeHTML(message.activityMemory || 'No saved memories were included')}</li><li class="activity-current" data-agent-current>${escapeHTML(finalStep)}</li></ol><p class="activity-note">This shows task and progress updates, not private internal reasoning.</p></div></details>`;
}
async function runBridgeCommand(content, build) {
  const config = build.agentConfig || {};
  if (!config.bridgeUrl || (!config.filesystem && !config.terminal)) return null;
  const command = String(content).trim();
  const token = sessionStorage.getItem(`${KEY_SESSION}.bridge.${build.id}`) || '';
  const headers = { 'content-type': 'application/json' }; if (token) headers.authorization = `Bearer ${token}`;
  const call = async (route, payload) => { const response = await fetch(`${config.bridgeUrl.replace(/\/$/, '')}${route}`, { method: 'POST', headers, body: JSON.stringify(payload) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || `Bridge returned ${response.status}`); return data; };
  if (config.filesystem && /^\/files(?:\s+(.*))?$/i.test(command)) { const data = await call('/workspace/list', { path: command.match(/^\/files(?:\s+(.*))?$/i)?.[1] || '.' }); return `Workspace files in ${data.path}:\n${data.entries.map((entry) => `${entry.type === 'directory' ? '📁' : '📄'} ${entry.name}`).join('\n') || '(empty)'}`; }
  if (config.filesystem && /^\/read\s+(.+)$/i.test(command)) { const data = await call('/workspace/read', { path: command.match(/^\/read\s+(.+)$/i)[1] }); return data.content; }
  if (config.filesystem && /^\/write\s+([^:]+)::\s*([\s\S]+)$/i.test(command)) { if ((config.approval || 'ask-before-write') !== 'trusted' && !window.confirm('Write this file through your local bridge?')) throw new DOMException('Write canceled.', 'AbortError'); const match = command.match(/^\/write\s+([^:]+)::\s*([\s\S]+)$/i); await call('/workspace/write', { path: match[1].trim(), content: match[2] }); return `Wrote ${match[1].trim()} in the configured workspace.`; }
  if (config.terminal && /^\/run\s+(.+)$/i.test(command)) { if ((config.approval || 'ask-before-write') !== 'trusted' && !window.confirm('Run this command through your local bridge?')) throw new DOMException('Command canceled.', 'AbortError'); const data = await call('/terminal/run', { command: command.match(/^\/run\s+(.+)$/i)[1] }); return `${data.stdout || ''}${data.stderr ? `\n${data.stderr}` : ''}`.trim() || '(command completed with no output)'; }
  return null;
}
function localModelWorker() {
  if (modelWorker) return modelWorker;
  modelWorker = new Worker('./model-worker.js', { type: 'module' });
  modelWorker.addEventListener('message', (event) => {
    const message = event.data || {};
    if (message.type === 'progress') {
      localModelPhase = 'downloading';
      localModelProgress = { label: message.label || 'Preparing the local model…', percent: Number(message.progress) || 0, hasPercent: Number.isFinite(Number(message.progress)) };
      updateModelProgress();
      return;
    }
    if (message.type === 'ready') {
      localModelPhase = 'ready'; localModelDevice = message.device || 'local'; localStorage.setItem(LOCAL_MODEL_KEY, 'true');
      modelLoadResolve?.(); modelLoadResolve = null; modelLoadReject = null; modelLoadPromise = null;
      if (currentPage === 'run' || currentPage === 'runtime') render();
      return;
    }
    if (message.type === 'token' && generationRequest?.id === message.requestId) {
      generationRequest.output += message.token || '';
      const bubble = document.querySelector('#chat-log .message.assistant:last-child [data-answer]');
      if (bubble) bubble.textContent = generationRequest.output;
      const activity = document.querySelector('#chat-log .message.assistant:last-child [data-agent-current]');
      if (activity) activity.textContent = 'Drafting the response';
      const log = document.querySelector('#chat-log'); if (log) log.scrollTop = log.scrollHeight;
      return;
    }
    if (message.type === 'complete' && generationRequest?.id === message.requestId) {
      const pending = generationRequest; generationRequest = null; clearTimeout(pending.timeout); pending.resolve(message.text || pending.output); return;
    }
    if (message.type === 'error') {
      const error = new Error(message.message || 'The local model could not start.');
      if (modelLoadReject) { localModelPhase = 'error'; modelLoadReject(error); modelLoadResolve = null; modelLoadReject = null; modelLoadPromise = null; }
      else if (generationRequest && (!message.requestId || generationRequest.id === message.requestId)) { const pending = generationRequest; generationRequest = null; pending.reject(error); }
      if (!localStorage.getItem(LOCAL_MODEL_KEY)) localModelPhase = 'error';
      updateModelProgress();
      if (currentPage === 'run' || currentPage === 'runtime') render();
    }
  });
  modelWorker.addEventListener('error', (event) => {
    const error = new Error(event.message || 'Could not start the local model worker.');
    localModelPhase = 'error'; modelLoadReject?.(error); modelLoadResolve = null; modelLoadReject = null; modelLoadPromise = null;
    if (generationRequest) { const pending = generationRequest; generationRequest = null; pending.reject(error); }
    updateModelProgress(); if (currentPage === 'run' || currentPage === 'runtime') render();
  });
  return modelWorker;
}
function updateModelProgress() {
  const bar = document.querySelector('#model-progress-bar');
  const copy = document.querySelector('#model-progress-copy');
  if (bar) { bar.value = localModelProgress.hasPercent ? localModelProgress.percent : 0; bar.hidden = !localModelProgress.hasPercent; }
  if (copy) copy.textContent = localModelProgress.label || (localModelPhase === 'downloading' ? 'Preparing the local model…' : '');
}
function loadLocalModel() {
  if (localModelPhase === 'ready') return Promise.resolve();
  if (modelLoadPromise) return modelLoadPromise;
  localModelPhase = 'downloading'; localModelProgress = { label: 'Connecting to the model library…', percent: 0, hasPercent: false };
  modelWorker = localModelWorker();
  modelLoadPromise = new Promise((resolve, reject) => { modelLoadResolve = resolve; modelLoadReject = reject; });
  modelWorker.postMessage({ type: 'load' });
  render();
  return modelLoadPromise;
}
function cancelLocalModelLoad() {
  modelWorker?.terminate(); modelWorker = null;
  modelLoadReject?.(new Error('Model setup canceled.')); modelLoadResolve = null; modelLoadReject = null; modelLoadPromise = null;
  localModelPhase = localStorage.getItem(LOCAL_MODEL_KEY) === 'true' ? 'cached' : 'missing';
  localModelProgress = { label: '', percent: 0, hasPercent: false }; render();
}
function selectLocalRuntime(build = activeBuild()) {
  const current = runtimeFor(build);
  const cloud = current.cloud || (current.endpoint ? { endpoint: current.endpoint, model: current.model, provider: current.provider } : null);
  build.runtimeConfig = { ...current, mode: 'local', provider: LOCAL_MODEL_NAME, endpoint: '', model: LOCAL_MODEL_ID, ...(cloud ? { cloud } : {}) };
  build.runtime = LOCAL_MODEL_NAME; build.updatedAt = new Date().toISOString(); saveState();
}
async function generateLocalReply(messages, temperature) {
  await loadLocalModel();
  const worker = localModelWorker();
  return new Promise((resolve, reject) => {
    const requestId = id();
    const timeout = setTimeout(() => {
      if (!generationRequest || generationRequest.id !== requestId) return;
      const pending = generationRequest;
      generationRequest = null;
      modelWorker?.terminate(); modelWorker = null;
      localModelPhase = localStorage.getItem(LOCAL_MODEL_KEY) === 'true' ? 'cached' : 'missing';
      pending.reject(new Error('The phone took too long to finish this reply.'));
    }, 120000);
    generationRequest = { id: requestId, output: '', resolve, reject, timeout };
    worker.postMessage({ type: 'generate', requestId, messages, temperature });
  });
}
function navLink([key, label, glyph], mobile = false) {
  return `<button class="nav-link ${currentPage === key ? 'active' : ''}" data-route="${key}" aria-current="${currentPage === key ? 'page' : 'false'}">${icon(glyph)}<span>${label}</span></button>`;
}
function sidebar() {
  const connected = runtimeReady();
  return `<aside class="sidebar" aria-label="Main navigation">
    <a class="brand" href="#home" data-route="home"><span class="brand-mark">K</span><span><span class="brand-name">kin</span><span class="brand-caption">AI, your way</span></span></a>
    <div class="workspace-pill"><div class="workspace-orb">Y</div><div><div class="workspace-label">Your studio</div><div class="workspace-sub">Private workspace</div></div></div>
    <div class="nav-label">Create</div><nav class="nav-list">${ROUTES.filter(([key]) => ['home', 'builder', 'model'].includes(key)).map((route) => navLink(route)).join('')}</nav>
    <div class="nav-spacer"></div><div class="nav-label">Personalize</div><nav class="nav-list">${ROUTES.filter(([key]) => ['memory', 'capabilities'].includes(key)).map((route) => navLink(route)).join('')}</nav>
    <div class="nav-spacer"></div><div class="nav-label">Use & manage</div><nav class="nav-list">${ROUTES.filter(([key]) => ['run', 'runtime', 'library'].includes(key)).map((route) => navLink(route)).join('')}</nav>
    <div class="sidebar-bottom"><div class="runtime-mini"><div class="runtime-mini-head"><span>${escapeHTML(activeBuild().name)} runtime</span><span class="status-dot" style="background:${connected ? '#b2db68' : '#f1bc68'}"></span></div><p>${connected ? `Ready with ${runtimeMode() === 'cloud' ? 'cloud model' : 'local model'}.` : runtimeMode() === 'cloud' ? 'Cloud endpoint needs setup.' : 'Set up the free local model to chat.'}</p><button data-route="${runtimeMode() === 'cloud' ? 'runtime' : 'run'}">${connected ? 'Open AI chat' : runtimeMode() === 'cloud' ? 'Connect cloud model' : 'Set up local AI'} ${icon('arrow')}</button></div><div class="profile-chip"><div class="avatar">Y</div><div><div class="profile-name">Your workspace</div><div class="profile-mode">Saved on this device</div></div></div></div>
  </aside>`;
}
function mobileNav() { return `<nav class="mobile-nav" aria-label="Mobile navigation">${ROUTES.filter(([key]) => ['home', 'builder', 'run', 'memory', 'library'].includes(key)).map((route) => navLink(route, true)).join('')}</nav>`; }
function pageHeading(eyebrow, title, subtitle, action = '') {
  return `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`;
}
function shell(content) {
  const current = ROUTES.find(([key]) => key === currentPage)?.[1] || 'Overview';
  root.innerHTML = `<div class="app-shell">${sidebar()}<main class="main"><header class="topbar"><div class="breadcrumbs">Your studio <span aria-hidden="true">/</span> <b>${current}</b></div><div class="top-actions"><button class="icon-button" aria-label="Open builder" data-route="builder">${icon('sliders')}</button><button class="icon-button" aria-label="Runtime settings" data-route="runtime">${icon('cpu')}</button></div></header><div class="page">${content}</div></main>${mobileNav()}${modalType ? renderModal() : ''}</div>`;
}
function renderHome() {
  const build = activeBuild();
  const ready = runtimeReady();
  const memories = memoriesFor().length;
  const capabilities = capabilitiesFor().length;
  shell(`${`<section class="hero"><div class="hero-copy"><div class="eyebrow">A little more you, in every answer</div><h1>Your AI should feel like <em>your</em> AI.</h1><p>Make an AI, download its free local brain, and start chatting. No endpoint setup needed.</p><button class="btn btn-primary" data-action="new-build">${icon('plus')} Create an AI</button></div><div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="orbit two"></div><div class="orbit three"></div><span class="satellite s1"></span><span class="satellite s2"></span><span class="satellite s3"></span><div class="core-orb">${icon('flower')}</div></div></section>
  <section class="stats-grid" aria-label="Studio summary"><article class="stat-card"><div><div class="stat-label">Your builds</div><div class="stat-number">${state.builds.length.toString().padStart(2, '0')}</div></div><div class="stat-icon">${icon('spark')}</div></article><article class="stat-card"><div><div class="stat-label">Saved memories</div><div class="stat-number">${memories.toString().padStart(2, '0')}</div></div><div class="stat-icon">${icon('memory')}</div></article><article class="stat-card"><div><div class="stat-label">Capabilities</div><div class="stat-number">${capabilities.toString().padStart(2, '0')}</div></div><div class="stat-icon">${icon('plug')}</div></article></section>
  <section><div class="section-head"><div><h2>Your AI builds</h2><p>Personal assistants made to work the way you do.</p></div><button class="btn btn-light btn-small" data-route="library">View all ${icon('arrow')}</button></div><article class="build-card"><div class="build-glyph">${icon('spark')}</div><div><div class="build-name">${escapeHTML(build.name)}</div><div class="build-meta">${escapeHTML(build.role)} <span aria-hidden="true">·</span> ${escapeHTML(runtimeMode(build) === 'local' ? LOCAL_MODEL_NAME : build.model || 'Choose a model')}</div><div style="display:flex;gap:6px;margin-top:8px"><span class="badge lime"><span class="status-dot" style="background:${ready ? '#718c2e' : '#bd9a4e'}"></span>${ready ? 'Ready to chat' : runtimeMode(build) === 'local' ? 'Download local model' : 'Finish cloud setup'}</span><span class="badge">${build.memoryEnabled ? 'Memory on' : 'Memory off'}</span></div></div><div class="build-actions"><button class="btn btn-light btn-small" data-route="builder">Edit build</button><button class="btn btn-dark btn-small" data-route="run">${icon('chat')} Open chat</button></div></article></section>
  <section class="two-col content-space"><article class="panel"><div class="section-head" style="margin-bottom:0"><div><h2>Make it yours</h2><p>Create first, then tune it as you go.</p></div></div><div class="next-step"><div class="step-number">01</div><div><div class="step-title">Name your AI and give it a role</div><div class="step-desc">Start chatting with the built-in local model.</div></div></div><div class="next-step"><div class="step-number">02</div><div><div class="step-title">Download its brain once</div><div class="step-desc">After setup, chats run on this device.</div></div></div><div class="next-step"><div class="step-number">03</div><div><div class="step-title">Add memory and tools</div><div class="step-desc">Personalize the build whenever you like.</div></div></div><button class="btn btn-dark btn-small" data-route="builder">Open the builder ${icon('arrow')}</button></article><article class="panel"><div class="panel-title">Private by default</div><p class="panel-copy">AI builds and saved memories stay in this browser. Local chats run on this device; choose a cloud endpoint only if you want one.</p><div class="callout" style="margin-top:15px"><strong>First download: about 500–800 MB.</strong> The small starter model is free to use, works best on newer phones, and needs internet once to download.</div><button class="btn btn-light btn-small" data-route="runtime">Local model settings ${icon('arrow')}</button></article></section>`}`);
}
function renderBuilder() {
  const build = activeBuild();
  const prompt = build.systemPrompt || '';
  const selectedMemories = memoriesFor(build).length;
  shell(`${pageHeading('Design your assistant', 'Build your AI', 'Give it a name, a point of view, and a model runtime. You can refine every part later.', `<button class="btn btn-light btn-small" data-route="library">${icon('layers')} My builds</button>`)}
    <div class="two-col content-space"><form class="panel" id="builder-form">
      <div class="field" style="margin-top:0"><label for="build-name">Name your AI</label><input id="build-name" class="input" name="name" maxlength="48" required value="${escapeHTML(build.name)}" placeholder="e.g. Nova" /></div>
      <div class="field"><label for="build-role">What is it for?</label><input id="build-role" class="input" name="role" maxlength="90" value="${escapeHTML(build.role)}" placeholder="A patient study buddy, creative partner..." /><div class="field-hint">A clear role helps you remember what this build is for.</div></div>
      <div class="field"><label for="build-prompt">Personality & instructions</label><textarea id="build-prompt" class="textarea" name="systemPrompt" maxlength="4000" placeholder="Describe its voice, values, boundaries, and how it should help.">${escapeHTML(prompt)}</textarea><div class="field-hint">Tell it how to speak, what to prioritize, and what to do when it is unsure.</div></div>
      <div class="field-row"><div class="field"><label for="build-model">Cloud model identifier</label><input id="build-model" class="input" name="model" maxlength="100" value="${escapeHTML(build.model)}" placeholder="e.g. llama3.2" /><div class="field-hint">The local starter model is selected in Runtime.</div></div><div class="field"><label for="build-temp">Creativity <span class="muted" id="temperature-value">${Number(build.temperature).toFixed(1)}</span></label><input id="build-temp" class="input" style="padding:7px 0;border:0;background:transparent;accent-color:#75864b" type="range" min="0" max="1.5" step="0.1" name="temperature" value="${Number(build.temperature) || 0.7}" /><div class="field-hint">Lower is more focused; higher is more exploratory.</div></div></div>
      <div class="toggle-row"><div><div class="toggle-title">Let this AI use your memories</div><div class="toggle-copy">${selectedMemories} saved ${selectedMemories === 1 ? 'memory' : 'memories'} can be added to its context.</div></div><button type="button" class="switch ${build.memoryEnabled ? 'on' : ''}" data-action="toggle-memory" role="switch" aria-checked="${build.memoryEnabled}" aria-label="Toggle AI memory"></button></div>
      <div class="form-actions"><button type="button" class="text-action" data-action="new-build">${icon('plus')} New build</button><div class="form-actions-end"><button type="button" class="btn btn-light btn-small" data-route="model">Model Lab</button><button type="button" class="btn btn-light btn-small" data-route="run">Preview chat</button><button class="btn btn-dark btn-small" type="submit">${icon('check')} Save build</button></div></div>
    </form><aside class="preview-card"><div class="preview-label">Live identity preview</div><div class="preview-top"><div class="preview-avatar">${icon('spark')}</div><div><div class="preview-name" id="live-name">${escapeHTML(build.name)}</div><div class="preview-role" id="live-role">${escapeHTML(build.role || 'Your AI, taking shape')}</div></div></div><div class="preview-divider"></div><div class="preview-label">Personality</div><div class="preview-prompt" id="live-prompt">${escapeHTML(prompt || 'Your instructions will shape how this AI communicates.')}</div><div class="preview-tags"><span class="preview-tag">${build.memoryEnabled ? 'memory enabled' : 'memory paused'}</span><span class="preview-tag">${escapeHTML(build.model || 'model to choose')}</span></div><p class="preview-note">A build is a reusable recipe: personality, memory settings, model connection, and attached capabilities.</p></aside></div>
    <section class="panel content-space"><div class="section-head"><div><h2>Agents</h2><p>Give your AI specialist roles. It routes each message to the closest match.</p></div><button class="btn btn-dark btn-small" data-action="add-agent">${icon('plus')} Add agent</button></div>${build.agents?.length ? `<div class="agent-grid">${build.agents.map((agent) => `<article class="agent-card"><div class="agent-card-head"><div class="build-glyph" style="width:32px;height:32px">${icon('spark')}</div><button class="text-action" data-action="delete-agent" data-id="${escapeHTML(agent.id)}" aria-label="Remove ${escapeHTML(agent.name)}">Remove</button></div><h3>${escapeHTML(agent.name)}</h3><p>${escapeHTML(agent.focus)}</p>${agent.keywords ? `<div class="agent-keywords">Matches: ${escapeHTML(agent.keywords)}</div>` : ''}</article>`).join('')}</div>` : `<div class="empty-state agent-empty"><div class="empty-title">Your AI works as one assistant for now</div><p class="empty-copy">Add specialists like a coding helper, study coach, or game designer. Kin will route each message to the best match.</p><button class="btn btn-light btn-small" data-action="add-agent">Create your first agent</button></div>`}<p class="field-hint" style="margin-top:12px">Agents share this AI’s model and memories. They are focused roles, not separate model downloads.</p></section>
    <form class="panel content-space" id="harness-form"><div class="section-head"><div><h2>Agent harness</h2><p>Control how the AI plans, uses tools, and asks before changes.</p></div><span class="badge lime">Agentic workflow</span></div><div class="field-row"><div class="field" style="margin-top:0"><label for="harness-reasoning">Reasoning profile</label><select id="harness-reasoning" class="select" name="reasoning"><option value="fast" ${build.agentConfig?.reasoning === 'fast' ? 'selected' : ''}>Fast answers</option><option value="balanced" ${!build.agentConfig?.reasoning || build.agentConfig?.reasoning === 'balanced' ? 'selected' : ''}>Balanced daily driver</option><option value="deep" ${build.agentConfig?.reasoning === 'deep' ? 'selected' : ''}>Deep multi-step work</option></select></div><div class="field" style="margin-top:0"><label for="harness-steps">Maximum tool steps</label><select id="harness-steps" class="select" name="maxSteps">${[4,8,12,20].map((value) => `<option value="${value}" ${Number(build.agentConfig?.maxSteps || 8) === value ? 'selected' : ''}>${value} steps</option>`).join('')}</select></div></div><div class="field"><label for="harness-approval">Change approval</label><select id="harness-approval" class="select" name="approval"><option value="always-ask" ${build.agentConfig?.approval === 'always-ask' ? 'selected' : ''}>Ask before every write or command</option><option value="ask-before-write" ${!build.agentConfig?.approval || build.agentConfig?.approval === 'ask-before-write' ? 'selected' : ''}>Ask before writes, allow reads</option><option value="trusted" ${build.agentConfig?.approval === 'trusted' ? 'selected' : ''}>Allow trusted tools</option></select></div><div class="toggle-row"><div><div class="toggle-title">Local filesystem bridge</div><div class="toggle-copy">Allow an explicitly connected local bridge to read workspace files.</div></div><button type="button" class="switch ${build.agentConfig?.filesystem ? 'on' : ''}" data-action="toggle-harness" data-field="filesystem" role="switch" aria-checked="${Boolean(build.agentConfig?.filesystem)}" aria-label="Toggle filesystem bridge"></button></div><div class="toggle-row"><div><div class="toggle-title">Terminal bridge</div><div class="toggle-copy">Allow approved commands through the local bridge after confirmation.</div></div><button type="button" class="switch ${build.agentConfig?.terminal ? 'on' : ''}" data-action="toggle-harness" data-field="terminal" role="switch" aria-checked="${Boolean(build.agentConfig?.terminal)}" aria-label="Toggle terminal bridge"></button></div><div class="field"><label for="harness-bridge">Local bridge URL</label><input id="harness-bridge" class="input" name="bridgeUrl" type="url" value="${escapeHTML(build.agentConfig?.bridgeUrl || '')}" placeholder="http://127.0.0.1:8787" /><div class="field-hint">Kin can use the bridge only after you run the included local bridge and enable the permissions above.</div></div><div class="field"><label for="harness-token">Bridge token</label><input id="harness-token" class="input" name="bridgeToken" type="password" placeholder="Saved for this browser session" /><div class="field-hint">The token is kept in session storage and is never exported.</div></div><div class="form-actions"><span class="field-hint">Commands: /files, /read path, /write path :: text, /run command.</span><button class="btn btn-dark btn-small" type="submit">${icon('check')} Save harness</button></div></form>`);
}
function renderModelLab() {
  const build = activeBuild();
  const config = { foundation: 'Local open model', family: LOCAL_MODEL_ID, architecture: 'Conversational assistant', context: '8192', modalities: ['text'], memory: 'Long-term memory', toolPolicy: 'Ask before using tools', autonomy: 'Confirm writes', learning: 'Prompt + examples', frame: ['conversation', 'memory', 'tool-router', 'safety'], ...(build.modelConfig || {}) };
  config.modalities = Array.isArray(config.modalities) && config.modalities.length ? config.modalities : ['text'];
  config.frame = Array.isArray(config.frame) && config.frame.length ? config.frame : ['conversation', 'memory', 'tool-router', 'safety'];
  const modalities = ['text', 'images', 'audio', 'files'];
  const frameParts = ['conversation', 'memory', 'tool-router', 'knowledge', 'safety', 'interface'];
  shell(`${pageHeading('Compose the intelligence', 'Model Lab', 'Create an AI from its building blocks: model source, agent frame, memory, tools, and boundaries.', `<button class="btn btn-light btn-small" data-action="export-blueprint">${icon('download')} Export blueprint</button>`)}
    <div class="two-col content-space"><form class="panel" id="model-form">
      <div class="callout" style="margin-top:0"><strong>This is your model recipe.</strong> Choose a model source and wire the parts around it. “From scratch” here means your own reusable AI design; training new foundation weights needs a separate GPU training pipeline.</div>
      <div class="field"><label for="model-foundation">Model source</label><select id="model-foundation" class="select" name="foundation"><option ${config.foundation === 'Local open model' ? 'selected' : ''}>Local open model</option><option ${config.foundation === 'Free cloud endpoint' ? 'selected' : ''}>Free cloud endpoint</option><option ${config.foundation === 'Custom model server' ? 'selected' : ''}>Custom model server</option><option ${config.foundation === 'Training pipeline' ? 'selected' : ''}>Training pipeline</option></select><div class="field-hint">Local and open routes can stay free; cloud limits and availability depend on the provider.</div></div>
      <div class="field-row"><div class="field"><label for="model-family">${config.foundation === 'Local open model' ? 'Active local model' : 'Model family / identifier'}</label><input id="model-family" class="input" name="family" value="${escapeHTML(config.foundation === 'Local open model' ? LOCAL_MODEL_ID : config.family)}" maxlength="120" placeholder="Model identifier" ${config.foundation === 'Local open model' ? 'readonly' : ''} /><div class="field-hint">${config.foundation === 'Local open model' ? 'This is the model Kin will run on this device.' : 'Use the exact model name accepted by your provider.'}</div></div><div class="field"><label for="model-context">Context window</label><select id="model-context" class="select" name="context">${['4096', '8192', '32768', '131072'].map((value) => `<option ${config.context === value ? 'selected' : ''}>${value}</option>`).join('')}</select></div></div>
      <div class="field"><label for="model-architecture">Agent frame</label><select id="model-architecture" class="select" name="architecture"><option ${config.architecture === 'Conversational assistant' ? 'selected' : ''}>Conversational assistant</option><option ${config.architecture === 'Coding agent' ? 'selected' : ''}>Coding agent</option><option ${config.architecture === 'Research agent' ? 'selected' : ''}>Research agent</option><option ${config.architecture === 'Game / manga companion' ? 'selected' : ''}>Game / manga companion</option><option ${config.architecture === 'Multimodal companion' ? 'selected' : ''}>Multimodal companion</option><option ${config.architecture === 'Custom agent' ? 'selected' : ''}>Custom agent</option></select></div>
      <div class="field"><label>Input modalities</label><div class="check-grid">${modalities.map((value) => `<label class="check-card"><input type="checkbox" name="modalities" value="${value}" ${config.modalities.includes(value) ? 'checked' : ''}><span><strong>${value[0].toUpperCase() + value.slice(1)}</strong><small>${value === 'text' ? 'Chat and instructions' : value === 'images' ? 'Vision inputs' : value === 'audio' ? 'Voice-ready inputs' : 'Documents and files'}</small></span></label>`).join('')}</div></div>
      <div class="field-row"><div class="field"><label for="model-memory">Memory system</label><select id="model-memory" class="select" name="memory"><option ${config.memory === 'Off' ? 'selected' : ''}>Off</option><option ${config.memory === 'Session only' ? 'selected' : ''}>Session only</option><option ${config.memory === 'Long-term memory' ? 'selected' : ''}>Long-term memory</option><option ${config.memory === 'Custom memory service' ? 'selected' : ''}>Custom memory service</option></select></div><div class="field"><label for="model-tools">Tool permission</label><select id="model-tools" class="select" name="toolPolicy"><option ${config.toolPolicy === 'No tools' ? 'selected' : ''}>No tools</option><option ${config.toolPolicy === 'Ask before using tools' ? 'selected' : ''}>Ask before using tools</option><option ${config.toolPolicy === 'Trusted tools only' ? 'selected' : ''}>Trusted tools only</option><option ${config.toolPolicy === 'Any enabled tool' ? 'selected' : ''}>Any enabled tool</option></select></div></div>
      <div class="field-row"><div class="field"><label for="model-autonomy">Autonomy boundary</label><select id="model-autonomy" class="select" name="autonomy"><option ${config.autonomy === 'Read-only' ? 'selected' : ''}>Read-only</option><option ${config.autonomy === 'Confirm writes' ? 'selected' : ''}>Confirm writes</option><option ${config.autonomy === 'Delegated with limits' ? 'selected' : ''}>Delegated with limits</option><option ${config.autonomy === 'Fully delegated' ? 'selected' : ''}>Fully delegated</option></select></div><div class="field"><label for="model-learning">Learning path</label><select id="model-learning" class="select" name="learning"><option ${config.learning === 'Prompt + examples' ? 'selected' : ''}>Prompt + examples</option><option ${config.learning === 'LoRA adapter' ? 'selected' : ''}>LoRA adapter</option><option ${config.learning === 'Fine-tuning job' ? 'selected' : ''}>Fine-tuning job</option><option ${config.learning === 'Train from scratch' ? 'selected' : ''}>Train from scratch</option></select></div></div>
      <div class="field"><label>Core modules</label><div class="check-grid">${frameParts.map((value) => `<label class="check-card compact"><input type="checkbox" name="frame" value="${value}" ${config.frame.includes(value) ? 'checked' : ''}><span><strong>${value === 'tool-router' ? 'Tool router' : value[0].toUpperCase() + value.slice(1)}</strong><small>${value === 'conversation' ? 'Messages and context' : value === 'memory' ? 'Durable user context' : value === 'tool-router' ? 'MCP, APIs, skills' : value === 'knowledge' ? 'Files and retrieval' : value === 'safety' ? 'Rules and approvals' : 'App or game surface'}</small></span></label>`).join('')}</div></div>
      <div class="form-actions"><button type="button" class="text-action" data-action="reset-model">Reset recipe</button><div class="form-actions-end"><button class="btn btn-dark btn-small" type="submit">${icon('check')} Save model recipe</button></div></div>
    </form><aside class="panel blueprint-preview"><div class="preview-label">${escapeHTML(build.name)} blueprint</div><div class="blueprint-title">${escapeHTML(config.architecture)}</div><p class="panel-copy">A portable plan for how this AI thinks, remembers, and acts.</p><div class="blueprint-stack"><div><span>Model</span><strong>${escapeHTML(config.family)}</strong></div><div><span>Context</span><strong>${escapeHTML(config.context)} tokens</strong></div><div><span>Tools</span><strong>${capabilitiesFor(build).length} attached packages</strong></div><div><span>Memory</span><strong>${escapeHTML(config.memory)}</strong></div><div><span>Learning</span><strong>${escapeHTML(config.learning)}</strong></div></div><div class="separator"></div><div class="preview-label">What happens next</div><p class="panel-copy">Save this recipe, connect a runtime, then attach skills, MCP servers, API specs, IDE files, or your own app surface. Kin exports the whole blueprint for another device.</p><button class="btn btn-light btn-small" data-route="capabilities">Manage tools & packages ${icon('arrow')}</button></aside></div>`);
}
function renderMemory() {
  const build = activeBuild();
  const items = memoriesFor(build);
  const list = items.length ? `<div class="memory-list">${items.map((entry) => `<article class="memory-item"><div class="memory-bullet">${icon('memory')}</div><div class="memory-text">${escapeHTML(entry.text)}<div class="memory-date">Added ${timeLabel(entry.createdAt)}</div></div><button class="text-action" data-action="delete-memory" data-id="${escapeHTML(entry.id)}" aria-label="Delete memory">${icon('trash')}</button></article>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${icon('memory')}</div><div class="empty-title">A blank memory shelf</div><p class="empty-copy">Add details you want your assistant to keep in mind. You can see, edit, and delete every memory here.</p></div>`;
  shell(`${pageHeading(`Memory for ${escapeHTML(build.name)}`, 'Memory', 'Give this AI continuity without giving up control. These notes stay on this device and can be removed anytime.', `<button class="btn btn-dark btn-small" data-action="add-memory">${icon('plus')} Add memory</button>`)}<div class="two-col content-space"><section class="panel"><div class="section-head"><div><h2>${escapeHTML(build.name)}’s memories <span class="badge">${items.length}</span></h2><p>Only this AI receives these notes, and only when memory is switched on.</p></div></div>${list}</section><aside class="panel"><div class="panel-title">Thoughtful memory, by design</div><p class="panel-copy">Start with stable preferences, goals, and context you actually want to reuse. Avoid storing passwords, private tokens, or details you would not want in a conversation.</p><div class="separator"></div><div class="toggle-row" style="margin:0;border:0"><div><div class="toggle-title">Memory for ${escapeHTML(build.name)}</div><div class="toggle-copy">${build.memoryEnabled ? 'This build can use saved notes.' : 'This build will not receive saved notes.'}</div></div><button type="button" class="switch ${build.memoryEnabled ? 'on' : ''}" data-action="toggle-memory" role="switch" aria-checked="${build.memoryEnabled}" aria-label="Toggle AI memory"></button></div><button class="btn btn-light btn-small" data-route="builder">Configure memory per build</button></aside></div>`);
}
function renderCapabilities() {
  const build = activeBuild();
  const items = capabilitiesFor();
  const list = items.length ? `<div class="cap-list">${items.map((item) => `<article class="cap-item"><div class="cap-icon">${icon(item.type === 'mcp' ? 'plug' : item.type === 'ide' ? 'cpu' : item.type === 'api' ? 'bolt' : 'book')}</div><div class="cap-body"><div class="cap-name">${escapeHTML(item.name)} <span class="cap-type">${escapeHTML(item.type)}</span></div><div class="cap-desc">${escapeHTML(item.description || item.fileName || item.endpoint || 'Personal capability package')}</div>${item.fileName ? `<div class="cap-desc mono">${escapeHTML(item.fileName)} · ${(item.size / 1024).toFixed(1)} KB</div>` : ''}</div><div class="cap-buttons"><button class="text-action" data-action="toggle-capability" data-id="${escapeHTML(item.id)}" aria-label="${item.enabled ? 'Disable' : 'Enable'} ${escapeHTML(item.name)}">${icon(item.enabled ? 'check' : 'eye')}</button><button class="text-action" data-action="delete-capability" data-id="${escapeHTML(item.id)}" aria-label="Remove ${escapeHTML(item.name)}">${icon('trash')}</button></div></article>`).join('')}</div>` : `<div class="empty-state"><div class="empty-icon">${icon('plug')}</div><div class="empty-title">Your capability shelf is empty</div><p class="empty-copy">Import your own skill, MCP manifest, OpenAPI file, IDE instructions, or other text-based package to keep it with your build.</p></div>`;
  shell(`${pageHeading(`Capabilities for ${escapeHTML(build.name)}`, 'Capabilities', 'Give this AI its own shelf of tools, skills, MCP manifests, API specs, IDE files, and other packages.', `<button class="btn btn-dark btn-small" data-action="add-package">${icon('plus')} Add package</button>`)}
    <div class="two-col content-space"><section class="panel"><div class="section-head"><div><h2>${escapeHTML(build.name)}’s packages <span class="badge">${items.length}</span></h2><p>Each AI build keeps its own capability package shelf.</p></div><button class="btn btn-light btn-small" data-action="add-package">${icon('plus')} Add</button></div>${list}</section><aside class="panel"><div class="drop-zone" id="drop-zone"><div class="drop-icon">${icon('upload')}</div><div class="drop-title">Bring your own files</div><div class="drop-copy">Any file type up to 512 KB. Skills, MCPs, APIs, IDE files, and more.</div><button class="btn btn-light btn-small" data-action="browse-files">Choose files</button><input class="sr-only" type="file" id="package-files" multiple /></div><div class="callout" style="margin-top:13px"><strong>Packages are stored, not executed.</strong> Kin does not run uploaded code or connect to MCP servers automatically. Review files for private keys before exporting or using them with a trusted runtime.</div><button class="btn btn-light btn-small" style="margin-top:12px" data-route="library">Export this AI with packages ${icon('arrow')}</button></aside></div>`);
}
function renderRuntime() {
  const build = activeBuild();
  const runtime = runtimeFor(build);
  const cloudRuntime = cloudRuntimeFor(build);
  const isCloud = runtimeMode(build) === 'cloud';
  const configured = runtimeReady(build);
  const keyStored = Boolean(sessionStorage.getItem(keyFor(build)));
  const localLoaded = localModelPhase === 'ready';
  const setupCopy = localModelPhase === 'downloading' ? localModelProgress.label || 'Downloading and preparing the local model…' : localModelPhase === 'cached' ? 'Model files are on this device. Load the model to begin chatting.' : localModelPhase === 'error' ? 'Setup stopped. Check your connection and available storage, then try again.' : 'Download the free starter model once. After that, your chats run on this device.';
  shell(`${pageHeading('Your AI’s brain', 'Model setup', 'Start chatting with the local model. A cloud endpoint is optional.')}
    <div class="two-col content-space"><section class="panel"><div class="runtime-banner ${localLoaded && !isCloud ? 'runtime-connected' : ''}">${icon(localLoaded && !isCloud ? 'check' : 'info')}<span>${isCloud && configured ? `${escapeHTML(build.name)} is connected to ${escapeHTML(runtime.provider || 'Cloud model')}.` : localLoaded ? `${escapeHTML(build.name)} is ready with ${LOCAL_MODEL_NAME}.` : setupCopy}</span></div>
      <div class="local-model-card"><div class="runtime-card"><div class="runtime-logo">${icon('cpu')}</div><div class="runtime-info"><div class="runtime-name">${LOCAL_MODEL_NAME}</div><div class="runtime-desc">Small text model · runs on this device · no API key</div></div><span class="runtime-status">${localLoaded ? 'READY' : localModelPhase === 'downloading' ? 'SETTING UP' : localModelPhase === 'cached' ? 'DOWNLOADED' : 'FREE'}</span></div>
        ${localModelPhase === 'downloading' ? `<div class="model-progress"><progress id="model-progress-bar" max="100" value="${localModelProgress.percent}" ${localModelProgress.hasPercent ? '' : 'hidden'}></progress><div id="model-progress-copy">${escapeHTML(localModelProgress.label || 'Preparing the local model…')}</div></div>` : ''}
        <div class="callout" style="margin-top:12px"><strong>First setup uses about 500–800 MB of data.</strong> Keep Kin open and use Wi-Fi for the first download. The downloaded model is cached by this browser. Answers from this small model may be simpler than cloud assistants.</div>
        <div class="form-actions"><button class="btn btn-dark btn-small" data-action="${isCloud ? 'start-local-model' : localLoaded ? 'open-chat' : 'start-local-model'}" ${localModelPhase === 'downloading' ? 'disabled' : ''}>${isCloud ? 'Use local model' : localLoaded ? 'Start chatting' : localModelPhase === 'cached' ? 'Load downloaded model' : localModelPhase === 'downloading' ? 'Setting up…' : 'Download free model'}</button>${localModelPhase === 'downloading' ? `<button class="btn btn-light btn-small" data-action="cancel-model-load">Cancel download</button>` : ''}</div>
      </div>
      <details class="cloud-setup" ${isCloud ? 'open' : ''}><summary>Use a cloud model instead</summary><p class="panel-copy">Cloud providers may need an account and API key. Free plans can change; your messages go to that provider.</p>
        <div class="field"><label for="runtime-provider">Connection name</label><select id="runtime-provider" class="select"><option ${cloudRuntime.provider === 'Free-tier cloud API' ? 'selected' : ''}>Free-tier cloud API</option><option ${cloudRuntime.provider === 'OpenAI-compatible' ? 'selected' : ''}>OpenAI-compatible</option><option ${cloudRuntime.provider === 'Custom endpoint' ? 'selected' : ''}>Custom endpoint</option></select></div>
        <div class="field"><label for="runtime-endpoint">Chat completions endpoint</label><input id="runtime-endpoint" class="input" type="url" value="${escapeHTML(cloudRuntime.endpoint || '')}" placeholder="https://provider.example/v1/chat/completions" /></div>
        <div class="field"><label for="runtime-model">Model identifier</label><input id="runtime-model" class="input" value="${escapeHTML(cloudRuntime.model || '')}" placeholder="Model name from your provider" /></div>
        <div class="field"><label for="runtime-key">${escapeHTML(build.name)}’s API key</label><input id="runtime-key" class="input" type="password" autocomplete="new-password" placeholder="${keyStored ? 'Key saved for this browser session' : 'Paste your provider key'}" /><div class="field-hint">The key stays in this browser session and is not included in exports.</div></div>
        <div class="form-actions"><button class="text-action" data-action="clear-runtime">Switch back to local model</button><div class="form-actions-end"><button type="button" class="btn btn-light btn-small" data-action="clear-api-key">Remove key</button><button class="btn btn-dark btn-small" data-action="save-runtime">Save cloud model</button></div></div>
      </details>
    </section><aside class="panel"><div class="panel-title">Your chats stay on this phone</div><p class="panel-copy">The local model works without a paid provider and does not send your messages to a model API. Internet is needed for the first model download. An optional cloud model can be configured below.</p><div class="next-step"><div class="step-number">01</div><div><div class="step-title">Download once</div><div class="step-desc">Allow around 500–800 MB of data and free storage.</div></div></div><div class="next-step"><div class="step-number">02</div><div><div class="step-title">Chat offline</div><div class="step-desc">The browser keeps model files for later chats.</div></div></div><div class="next-step"><div class="step-number">03</div><div><div class="step-title">Make it yours</div><div class="step-desc">Your AI’s role, personality, and memories shape its replies.</div></div></div></aside></div>`);
}
function renderRun() {
  const build = activeBuild();
  const runtime = runtimeFor(build);
  const ready = runtimeReady(build);
  const mode = runtimeMode(build);
  if (mode === 'local' && !ready) {
    const downloading = localModelPhase === 'downloading';
    const cached = localModelPhase === 'cached';
    const failed = localModelPhase === 'error';
    const heading = downloading ? 'Getting your model ready' : cached ? 'Your model is downloaded' : failed ? 'Setup needs another try' : 'Give your AI its brain';
    const action = downloading ? '' : cached ? 'Load downloaded model' : failed ? 'Retry model setup' : 'Download free model';
    shell(`${pageHeading(`Ready to meet ${escapeHTML(build.name)}?`, 'Run your AI', 'One quick setup, then you can chat without entering any endpoint.')}
      <section class="panel model-setup-panel content-space"><div class="setup-symbol">${icon('cpu')}</div><div class="blueprint-title">${heading}</div><p class="panel-copy">${downloading ? escapeHTML(localModelProgress.label || 'Downloading model files… Keep this page open.') : cached ? 'The model files are saved on this device. Load them to start your first chat.' : failed ? 'The download or model setup did not finish. Check your internet connection and available storage, then retry.' : `Download ${LOCAL_MODEL_NAME}, a free starter model that runs on your phone. It needs internet once and about 500–800 MB of data.`}</p>
      ${downloading ? `<div class="model-progress"><progress id="model-progress-bar" max="100" value="${localModelProgress.percent}" ${localModelProgress.hasPercent ? '' : 'hidden'}></progress><div id="model-progress-copy">${escapeHTML(localModelProgress.label || 'Preparing the local model…')}</div></div>` : ''}
      <div class="setup-actions">${action ? `<button class="btn btn-dark" data-action="start-local-model">${icon(cached ? 'check' : 'download')}${action}</button>` : ''}${downloading ? `<button class="btn btn-light btn-small" data-action="cancel-model-load">Cancel download</button>` : `<button class="btn btn-light btn-small" data-route="runtime">Use a cloud model</button>`}</div>
      <div class="callout" style="margin-top:15px"><strong>Your custom AI is already saved.</strong> This step downloads the shared model engine that lets it answer. The model is small and fast to set up; it will not be as capable as large cloud models.</div></section>`);
    return;
  }
  if (mode === 'cloud' && !ready) {
    shell(`${pageHeading(`Ready to meet ${escapeHTML(build.name)}?`, 'Run your AI', 'The selected cloud model still needs its endpoint and model name.')}
      <section class="panel model-setup-panel content-space"><div class="setup-symbol">${icon('bolt')}</div><div class="blueprint-title">Finish cloud setup</div><p class="panel-copy">Add the provider’s chat endpoint and model identifier. You can switch back to the free on-device model anytime.</p><div class="setup-actions"><button class="btn btn-dark" data-route="runtime">Finish cloud setup ${icon('arrow')}</button><button class="btn btn-light btn-small" data-action="clear-runtime">Use free local model</button></div></section>`);
    return;
  }
  const log = chatMessages.length ? chatMessages.map((message, index) => {
    const waiting = isSending && index === chatMessages.length - 1 && message.role === 'assistant' && !message.content;
    const body = message.role === 'assistant' ? `<div data-answer>${waiting ? '<span class="thinking-indicator" id="thinking-status">Thinking on your device…</span>' : escapeHTML(message.content)}</div>${activityMarkup(message)}` : escapeHTML(message.content);
    return `<div class="message ${message.role}"><div class="message-bubble">${body}</div><div class="message-time">${message.role === 'user' ? 'You' : escapeHTML(build.name)} · ${new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(message.time))}</div></div>`;
  }).join('') : `<div class="chat-empty"><div class="preview-avatar">${icon('spark')}</div><h3>${ready ? `Meet ${escapeHTML(build.name)}` : 'Your conversation starts here'}</h3><p>${ready ? 'Try a question and see how your personality settings shape the answer.' : 'Connect a model runtime to start chatting. Your build and memory are already saved locally.'}</p></div>`;
  shell(`${pageHeading('Try it out', 'Run your AI', `A private preview of ${escapeHTML(build.name)}. Messages in this preview stay in memory until you leave this page.`, `<button class="btn btn-light btn-small" data-route="builder">${icon('sliders')} Tune personality</button>`)}
    <section class="chat-shell content-space"><div class="chat-head"><div style="display:flex;align-items:center;gap:10px"><div class="preview-avatar" style="width:31px;height:31px">${icon('spark')}</div><div><div class="build-name">${escapeHTML(build.name)}</div><div class="build-meta">${escapeHTML(mode === 'local' ? `${LOCAL_MODEL_NAME} · ${localModelDevice || 'on device'}` : runtime.model || build.model)}</div></div></div><span class="badge lime"><span class="status-dot" style="background:#718c2e"></span>${mode === 'local' ? 'On device' : 'Cloud model'}</span></div><div class="chat-log" id="chat-log">${log}</div><form class="chat-compose" id="chat-form"><label class="sr-only" for="chat-input">Message your AI</label><textarea class="textarea" id="chat-input" name="message" maxlength="4000" placeholder="Say hello to ${escapeHTML(build.name)}…" ${isSending ? 'disabled' : ''} required></textarea>${isSending && mode === 'local' ? '<button class="btn btn-light" type="button" data-action="stop-generation" aria-label="Stop response">Stop</button>' : isSending ? '<button class="btn btn-dark" type="button" disabled aria-label="Waiting for response">…</button>' : `<button class="btn btn-dark" type="submit" aria-label="Send message">${icon('arrow')}</button>`}</form></section><p class="inline-note" style="margin-top:9px">${mode === 'local' ? 'The first reply can take a little while while your phone warms up the model. It runs on this device.' : 'Your message, AI instructions, and enabled memories are sent to your selected cloud provider.'}</p>`);
  const logEl = document.querySelector('#chat-log');
  if (logEl) logEl.scrollTop = logEl.scrollHeight;
  if (isSending && mode === 'local') {
    clearTimeout(thinkingTimer);
    thinkingTimer = setTimeout(() => {
      const status = document.querySelector('#thinking-status');
      if (status) status.textContent = 'Still working—your phone is running the model. You can stop and retry if it gets stuck.';
    }, 12000);
  }
}
function renderLibrary() {
  const cards = state.builds.map((build) => `<article class="library-card"><div class="library-card-top"><div class="build-glyph" style="width:36px;height:36px">${icon('spark')}</div><span class="badge ${build.id === state.activeBuildId ? 'lime' : ''}">${build.id === state.activeBuildId ? 'Active' : 'Saved build'}</span></div><div class="library-title" style="margin-top:12px">${escapeHTML(build.name)}</div><div class="library-meta">${escapeHTML(build.role || 'Personal AI build')} · ${escapeHTML(runtimeMode(build) === 'local' ? LOCAL_MODEL_NAME : build.model || 'No model selected')}</div><div class="library-actions"><button class="btn btn-light btn-small" data-action="select-build" data-id="${escapeHTML(build.id)}">${build.id === state.activeBuildId ? 'Current build' : 'Use this build'}</button><button class="btn btn-light btn-small" data-action="export-build" data-id="${escapeHTML(build.id)}">${icon('download')} Export</button>${state.builds.length > 1 ? `<button class="btn btn-light btn-small" data-action="delete-build" data-id="${escapeHTML(build.id)}" aria-label="Delete ${escapeHTML(build.name)}">${icon('trash')}</button>` : ''}</div></article>`).join('');
  shell(`${pageHeading('Your personal AI collection', 'My builds', 'Keep different personalities for different parts of your life. Export a portable backup whenever you want.', `<button class="btn btn-dark btn-small" data-action="new-build">${icon('plus')} New build</button>`)}<div class="library-grid">${cards}</div><div class="two-col content-space"><section class="panel"><div class="panel-title">Move your AI to another device</div><p class="panel-copy">A build package can include its personality, memories, and capability files. API keys are never included. Import the JSON file on another device to continue there.</p><div class="library-actions"><button class="btn btn-dark btn-small" data-action="export-all">${icon('download')} Export studio backup</button><button class="btn btn-light btn-small" data-action="import-build">${icon('upload')} Import build</button><input class="sr-only" id="import-file" type="file" accept=".json,application/json" /></div></section><aside class="panel"><div class="panel-title">A note about “from scratch”</div><p class="panel-copy">Kin lets you create the assistant recipe from scratch: its identity, instructions, memory, and capabilities. The built-in local brain answers messages; cloud models are optional. Training new foundation-model weights is a separate compute-heavy process and is not run on the phone.</p></aside></div>`);
}
function renderModal() {
  if (modalType === 'agent') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 class="modal-title" id="modal-title">Create a specialist agent</h2><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close')}</button></div><p class="panel-copy" style="margin-top:7px">Give this agent a clear specialty. Kin will choose it when a message matches its focus or keywords.</p><form id="agent-form"><div class="field"><label for="agent-name">Agent name</label><input id="agent-name" class="input" name="name" maxlength="40" required placeholder="e.g. Code Coach" /></div><div class="field"><label for="agent-focus">Specialty</label><input id="agent-focus" class="input" name="focus" maxlength="100" required placeholder="e.g. Explain and debug JavaScript" /></div><div class="field"><label for="agent-keywords">Matching words</label><input id="agent-keywords" class="input" name="keywords" maxlength="160" placeholder="code, bug, website, javascript" /><div class="field-hint">Separate words with commas. These help route the right questions.</div></div><div class="field"><label for="agent-instructions">Instructions</label><textarea id="agent-instructions" class="textarea" name="instructions" maxlength="1200" placeholder="How should this specialist handle its tasks?"></textarea></div><div class="modal-actions"><button type="button" class="btn btn-light btn-small" data-action="close-modal">Cancel</button><button class="btn btn-dark btn-small">Add agent</button></div></form></section></div>`;
  if (modalType === 'memory') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 class="modal-title" id="modal-title">Add a memory</h2><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close')}</button></div><p class="panel-copy" style="margin-top:7px">Keep it short, useful, and something you want your AI to remember.</p><form id="memory-form"><div class="field"><label for="memory-text">Memory</label><textarea id="memory-text" class="textarea" name="text" maxlength="600" required placeholder="I prefer examples before explanations…"></textarea></div><div class="modal-actions"><button type="button" class="btn btn-light btn-small" data-action="close-modal">Cancel</button><button class="btn btn-dark btn-small">Save memory</button></div></form></section></div>`;
  if (modalType === 'package') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 class="modal-title" id="modal-title">Add a capability</h2><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close')}</button></div><p class="panel-copy" style="margin-top:7px">Add a link or manifest to your private package shelf. Kin stores it for export; it does not execute package code.</p><form id="package-form"><div class="field"><label for="package-name">Name</label><input id="package-name" class="input" name="name" maxlength="70" required placeholder="e.g. GitHub MCP server" /></div><div class="field-row"><div class="field"><label for="package-type">Package type</label><select id="package-type" class="select" name="type"><option value="skill">Skill / instructions</option><option value="mcp">MCP server</option><option value="api">API / OpenAPI</option><option value="ide">IDE setup</option><option value="other">Other</option></select></div><div class="field"><label for="package-endpoint">Optional URL</label><input id="package-endpoint" class="input" name="endpoint" type="url" placeholder="https://…" /></div></div><div class="field"><label for="package-desc">What is it for?</label><textarea id="package-desc" class="textarea" style="min-height:70px" name="description" maxlength="500" placeholder="What does this package add to your workflow?"></textarea></div><div class="modal-actions"><button type="button" class="btn btn-light btn-small" data-action="close-modal">Cancel</button><button class="btn btn-dark btn-small">Add to shelf</button></div></form></section></div>`;
  if (modalType === 'new-build') return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 class="modal-title" id="modal-title">Start a new AI build</h2><button class="modal-close" data-action="close-modal" aria-label="Close">${icon('close')}</button></div><p class="panel-copy" style="margin-top:7px">Create a fresh personality and choose how it should help.</p><form id="new-build-form"><div class="field"><label for="new-build-name">Name</label><input id="new-build-name" class="input" name="name" maxlength="48" required placeholder="e.g. Atlas" /></div><div class="field"><label for="new-build-role">Role</label><input id="new-build-role" class="input" name="role" maxlength="90" placeholder="e.g. A creative writing partner" /></div><div class="modal-actions"><button type="button" class="btn btn-light btn-small" data-action="close-modal">Cancel</button><button class="btn btn-dark btn-small">Create build ${icon('arrow')}</button></div></form></section></div>`;
  return '';
}
function render() {
  document.title = `Kin — ${ROUTES.find(([key]) => key === currentPage)?.[1] || 'Your AI, your way'}`;
  if (currentPage === 'builder') return renderBuilder();
  if (currentPage === 'model') return renderModelLab();
  if (currentPage === 'memory') return renderMemory();
  if (currentPage === 'capabilities') return renderCapabilities();
  if (currentPage === 'runtime') return renderRuntime();
  if (currentPage === 'run') return renderRun();
  if (currentPage === 'library') return renderLibrary();
  renderHome();
}
function toast(message, isError = false) {
  const region = document.querySelector('.toast-region');
  if (!region) return;
  const element = document.createElement('div');
  element.className = `toast ${isError ? 'error' : ''}`;
  element.textContent = message;
  region.append(element);
  setTimeout(() => element.remove(), 3400);
}
function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function exportBuild(build) {
  const bundle = { format: 'kin-build', version: 1, exportedAt: new Date().toISOString(), build, memories: memoriesFor(build), capabilities: capabilitiesFor(build) };
  downloadJSON(`${build.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'kin-build'}.kin.json`, bundle);
  toast('Build exported. Runtime keys are never included.');
}
function exp