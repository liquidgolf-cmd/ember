# Ember 🔵

An AI companion with an animated face, voice input, and multi-LLM support.

## Features

- **Animated expressive eyes** — reacts to listening, thinking, speaking, happy, surprised states
- **Voice pipeline** — Web Speech API (STT) → Claude → Google Neural2 TTS
- **Multi-LLM ready** — Claude (active), GPT-4o, Grok, Gemini (swap in Settings)
- **Voice engine stack** — Google Neural2 (primary) → ElevenLabs (production-ready slot) → Browser TTS (fallback)
- **Persistent memory** — remembers your name, tone, model, topics across sessions via localStorage
- **Three listen modes** — Tap eyes, Hold Spacebar, or Always Listening
- **Cowork-ready** — postMessage API for embedding as a floating widget

## Setup

1. Open the app and complete the 6-step onboarding
2. Paste your **Anthropic API key** (`sk-ant-...`) — for Claude responses
3. Paste your **Google Cloud TTS API key** (`AIza...`) — for Neural2 voice
4. Choose your tone, voice, and listen mode

All keys are stored **only in your browser's localStorage** — never on any server.

## Voice Engines

| Engine | Status | Key needed |
|---|---|---|
| Google Neural2 | ✅ Active | Google Cloud TTS API key |
| ElevenLabs | 🔜 Production slot | ElevenLabs API key + Voice ID |
| Browser TTS | ✅ Fallback | None |

## Google Neural2 Voices

| Voice | Character |
|---|---|
| `en-US-Neural2-F` | Warm, clear — recommended |
| `en-US-Neural2-C` | Fuller, slightly warmer |
| `en-US-Neural2-E` | Soft, gentle |
| `en-US-Neural2-G` | Bright, expressive |
| `en-US-Studio-O` | Broadcast quality (premium) |

## Cowork Embed API

```js
// Control Ember from a parent frame
const ember = document.getElementById('emberIframe').contentWindow;

ember.postMessage({ ember: 'setState', value: 'listening' }, '*');
ember.postMessage({ ember: 'setState', value: 'thinking', greeting: 'Let me check that...' }, '*');
ember.postMessage({ ember: 'setState', value: 'speaking', speak: 'Task complete!' }, '*');

// Direct API access
ember.emberAPI.setState('happy');
ember.emberAPI.flash('Welcome back!');
ember.emberAPI.speakText('Good morning.');
ember.emberAPI.getProfile(); // returns stored user profile
```

## Deployment

Hosted on Vercel. Auto-deploys on push to `main`.

## Roadmap

- [ ] ElevenLabs production integration
- [ ] Cowork floating widget mode
- [ ] Additional LLM keys (GPT-4o, Grok, Gemini)
- [ ] Mobile PWA manifest
- [ ] Wake word detection
