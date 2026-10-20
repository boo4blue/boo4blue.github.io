set -x
export OLLAMA_MODELS=$HOME/.cache/cloudpc-models/ollama-models
OBIN=$(find $HOME/.cache/cloudpc-models/ollama-bin -name ollama -type f 2>/dev/null | head -1)
echo "OBIN=$OBIN"
ls $HOME/.cache/cloudpc-models/ 2>/dev/null
free -g
if [ -z "$OBIN" ]; then echo "NO OLLAMA BIN CACHED"; exit 1; fi
export OLLAMA_HOST=127.0.0.1:11434
$OBIN serve > /tmp/ollama.log 2>&1 &
sleep 5
$OBIN list
echo "--- direct run attempt ---"
timeout 280 $OBIN run qwen2.5-coder:14b "Reply with exactly: SELFTEST OK" 2>&1 | head -30
echo "--- server log tail ---"
tail -30 /tmp/ollama.log
