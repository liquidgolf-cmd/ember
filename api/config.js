module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache');
  res.setHeader('Content-Type', 'application/json');
  res.json({
    anthropic: process.env.ANTHROPIC_KEY || '',
    google: process.env.GOOGLE_TTS_KEY || '',
    voice: process.env.GOOGLE_VOICE || 'en-US-Neural2-F',
    openai: process.env.OPENAI_KEY || '',
    gemini: process.env.GEMINI_KEY || '',
  });
};
