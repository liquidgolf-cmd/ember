#!/bin/bash
# Ember build script — injects environment variables into index.html
# Runs on Vercel at deploy time. Keys never live in source code.

cp index.html dist/index.html

# Replace placeholders with real env vars
sed -i "s|__ANTHROPIC_KEY__|${ANTHROPIC_KEY}|g" dist/index.html
sed -i "s|__GOOGLE_TTS_KEY__|${GOOGLE_TTS_KEY}|g" dist/index.html

echo "✅ Ember build complete — keys injected."
