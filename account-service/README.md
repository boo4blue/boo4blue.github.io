# Kin account service

This is Kin's own account API for login and private studio sync. It uses a Cloudflare Worker and D1 SQLite database; it does not use Supabase. Passwords are stored as salted PBKDF2 hashes. Sessions are random bearer tokens whose hashes are stored in D1. The owner setup token is a Worker secret and must never be put in the website bundle.

## Deploy once from an authenticated Cloudflare account

1. Install Node.js, then run `npx wrangler login` and finish the browser sign-in.
2. From this directory, run `npx wrangler d1 create kin-accounts` and copy the returned database ID into `wrangler.jsonc` in place of `REPLACE_WITH_D1_DATABASE_ID`.
3. Run `npx wrangler d1 execute kin-accounts --remote --file=schema.sql`.
4. Set the owner enrollment secret with `npx wrangler secret put OWNER_SETUP_TOKEN`. Use a new random setup token. The setup token is needed only for the first owner registration; never reuse an account password as this token. `OWNER_EMAIL` is already set in `wrangler.jsonc`.
5. Run `npx wrangler deploy` and save the resulting `workers.dev` URL. Kin's account screen can then be connected to that API URL.

The free plan provides a small database suitable for a personal studio. The API limits saved studio data to 750 KB per account. Email addresses are not verified because no mail service is configured; the owner setup token protects the first owner claim.

## Local development

Apply the schema locally with `npx wrangler d1 execute kin-accounts --local --file=schema.sql`, then run `npx wrangler dev`. The API accepts the Kin Pages origin and localhost development origins.

Endpoints: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, and `GET|PUT /account/data`. `GET /health` reports service availability.
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