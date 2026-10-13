import { env, pipeline, TextStreamer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

const MODEL_ID = 'onnx-community/Qwen2.5-0.5B-Instruct';
env.allowLocalModels = false;
env.useBrowserCache = true;
env.useWasmCache = true;
env.backends.onnx.wasm.numThreads = 1;

let generator = null;
let selectedDevice = 'wasm';

function reportProgress(info = {}) {
  const percent = Number.isFinite(info.progress) ? info.progress : null;
  const fileName = info.file ? String(info.file).split('/').pop() : '';
  const status = info.status === 'progress' ? `Downloading ${fileName || 'model files'}${percent === null ? '' : ` · ${Math.round(percent)}%`}` : info.status === 'done' ? `Ready: ${fileName || 'model file'}` : 'Preparing the local model…';
  self.postMessage({ type: 'progress', label: status, progress: percent });
}

async function load() {
  if (generator) {
    self.postMessage({ type: 'ready', device: selectedDevice });
    return;
  }
  let device = 'wasm';
  if (navigator.gpu) {
    try { if (await navigator.gpu.requestAdapter()) device = 'webgpu'; } catch { /* Use the portable CPU backend. */ }
  }
  try {
    generator = await pipeline('text-generation', MODEL_ID, {
      device,
      dtype: device === 'webgpu' ? 'q4f16' : 'q4',
      progress_callback: reportProgress
    });
    selectedDevice = device === 'webgpu' ? 'WebGPU' : 'CPU';
  } catch (error) {
    if (device !== 'webgpu') throw error;
    self.postMessage({ type: 'progress', label: 'This browser could not use WebGPU. Switching to the slower CPU model…' });
    generator = await pipeline('text-generation', MODEL_ID, {
      device: 'wasm',
      dtype: 'q4',
      progress_callback: reportProgress
    });
    selectedDevice = 'CPU';
  }
  self.postMessage({ type: 'ready', device: selectedDevice });
}

self.addEventListener('message', async (event) => {
  const message = event.data || {};
  try {
    if (message.type === 'load') {
      await load();
      return;
    }
    if (message.type === 'generate') {
      if (!generator) await load();
      let output = '';
      const temperature = Number.isFinite(Number(message.temperature)) ? Number(mess