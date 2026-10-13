const CACHE = 'kin-shell-v10';
const APP_FILES = ['./', './index.html', './styles.css', './catalog.css', './connections.css', './app.js', './model-worker.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Keep Transformers.js and other model asset caches. Only retire Kin's
    // previous app-shell caches when the site is updated.
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('kin-shell-') && key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});
# Kin

Kin is an installable, local-first AI studio. Create multiple assistant builds, shape each personality, compose a model recipe, manage editable memories, collect skill/MCP/API/IDE packages, chat with a built-in on-device model, and optionally connect a cloud model.

## Run it locally

The app has no build step or paid backend. Serve this folder over HTTP:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The service worker caches the app shell after the first visit. To install it on a phone, serve it from an HTTPS origin and use the browser's **Add to Home Screen** or **Install app** action. A phone can also open a local-network address for a quick preview, though browsers require a secure context for install/offline service-worker features.

## Chat with your AI

Create an AI and choose **Download free model** on its chat screen. Kin downloads the Qwen2.5 0.5B Instruct ONNX model on first use (roughly 500–800 MB depending on the browser's compute path), then runs it in a Web Worker. It prefers WebGPU and falls back to WebAssembly on the CPU. Keep the app open and use Wi-Fi for the first download; later chats reuse the model from browser storage. Small local models are less capable than large cloud assistants and may run slowly on older phones.

Cloud models remain optional under **Runtime → Use a cloud model instead**. Browse live chat model catalogs from Hugging Face Inference Providers or OpenRouter; choosing a result fills in its compatible endpoint, provider, and model ID. Search or filter to models currently marked free, then add a key from that provider. Catalog availability, prices, and free limits can change. Each AI can still use a custom OpenAI-compatible endpoint. API keys stay in session storage for that browser session and are never included in exports. Cloud providers receive prompts and enabled memories.

## Add specialist agents

Open **AI Builder → Agents → Add agent** to give an AI named specialist roles, such as a coding helper or game designer. Kin routes each message to the closest matching focus or keywords and adds that agent's instructions to the same model request. In chat, open **Thinking · [agent]** to see the assigned task, memory use, and reply progress. This panel reports actions and status, not hidden internal reasoning. Specialist agents share the parent AI's model and memory.

## Enable filesystem and terminal tools

The **Agent harness** section in AI Builder controls reasoning depth, maximum tool steps, approval rules, and optional local bridges. To connect the included bridge from a trusted computer:

```sh
KIN_WORKSPACE=/path/to/project KIN_BRIDGE_TOKEN=choose-a-secret node kin-bridge.mjs
```

Set the bridge URL to `http://127.0.0.1:8787`, enable filesystem or terminal access, and use the same bearer token in the bridge client you connect. The bridge exposes workspace list/read/write and terminal run endpoints, validates paths stay inside the configured workspace, and caps command time at two minutes. Keep it on localhost and use a strong token; it grants real access to the configured folder.

## Create an AI from its parts

**Model Lab** is the “from scratch” design layer. Choose the model source, context window, input modalities, agent frame, memory system, tool permissions, autonomy boundary, learning path, and core modules (conversation, memory, tool router, knowledge, safety, and interface). Save the recipe per AI build and export it as a portable blueprint.

The blueprint describes a complete assistant system around model weights. The `LoRA adapter`, `Fine-tuning job`, and `Train from scratch` choices are handoff points for a separate training pipeline; the browser does not pretend to train a foundation model or run uploaded code.

## Scope and data

- Build profiles, per-build memories, and uploaded packages are stored in this browser's local storage. Each package file is limited to 512 KB and browser storage has a device-specific quota. Export regular backups before clearing browser data or moving devices.
- Uploaded packages are treated as data. Kin does not execute uploaded scripts or automatically connect to MCP servers.
- Kin creates assistant configurations; it does not train foundation-model weights. Training a foundation model requires a separate compute-intensive workflow.
- The app runs as a phone-friendly PWA. Local inference needs a supported browser, enough memory/storage, and an initial model download. If local inference is unsupported, connect a compatible cloud endpoint under Runtime.