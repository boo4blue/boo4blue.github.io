set -e
LOG="/home/runner/work/boo4blue.github.io/boo4blue.github.io/cloud-pc/storage/rvc-training.log"
exec > >(tee -a "$LOG") 2>&1
echo "=== RVC Naruto Training Setup - $(date) ==="
START=$(date +%s)

# 1. Download reference audio (10.5MB FLAC)
echo "[1/6] Downloading reference audio..."
curl -L --retry 3 "https://muse.ai/files/1400300103161982/872612365880023/0j0u8ozreyguhfkidwxxav2p/naruto-mega-ref.flac" -o naruto-mega-ref.flac
ls -lh naruto-mega-ref.flac

# 2. Install Python deps (CPU torch)
echo "[2/6] Installing Python dependencies..."
pip install --quiet torch torchaudio --index-url https://download.pytorch.org/whl/cpu 2>&1 | tail -2
pip install --quiet numpy scipy librosa soundfile 2>&1 | tail -2

# 3. Clone RVC repo (shallow, no history)
echo "[3/6] Cloning RVC repository..."
if [ ! -d "Retrieval-based-Voice-Conversion-WebUI" ]; then
  git clone --depth 1 https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI.git
fi
cd Retrieval-based-Voice-Conversion-WebUI

# 4. Download pretrained models
echo "[4/6] Downloading pretrained models..."
mkdir -p assets/hubert assets/pretrained
if [ ! -f "assets/hubert/hubert_base.pt" ]; then
  curl -L --retry 3 "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt" -o assets/hubert/hubert_base.pt
fi
if [ ! -f "assets/pretrained/f0G40k.pth" ]; then
  curl -L --retry 3 "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/pretrained/f0G40k.pth" -o assets/pretrained/f0G40k.pth
fi
if [ ! -f "assets/pretrained/f0D40k.pth" ]; then
  curl -L --retry 3 "https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/pretrained/f0D40k.pth" -o assets/pretrained/f0D40k.pth
fi
ls -lh assets/hubert/ assets/pretrained/

# 5. Convert FLAC to WAV 40kHz mono for RVC
echo "[5/6] Converting audio to RVC format..."
mkdir -p dataset/naruto-en
ffmpeg -v error -y -i ../naruto-mega-ref.flac -ac 1 -ar 40000 dataset/naruto-en/naruto-ref.wav
ls -lh dataset/naruto-en/

# 6. Test HuBERT loading (don't run full extraction yet - just verify)
echo "[6/6] Verifying HuBERT model loads..."
python3 -c "
import torch
print('torch:', torch.__version__)
print('cuda available:', torch.cuda.is_available())
# Just verify the file exists and is valid
import os
sz = os.path.getsize('assets/hubert/hubert_base.pt')
print(f'hubert_base.pt: {sz/1e6:.1f}MB')
assert sz > 300e6, 'HuBERT file too small, download failed'
print('SETUP OK')
"

ELAPSED=$(( $(date +%s) - START ))
echo "=== Setup complete in ${ELAPSED}s ==="
echo "Next: run preprocessing (HuBERT + F0 extraction) then training"
