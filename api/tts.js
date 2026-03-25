module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }

  try {
    const key = process.env.GOOGLE_TTS_KEY;
    if (!key) { res.status(400).json({error:'No Google TTS key configured'}); return; }

    const { text, voice, speakingRate, pitch } = req.body;
    const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-US', name: voice || 'en-US-Neural2-F' },
        audioConfig: { audioEncoding: 'MP3', speakingRate: speakingRate || 0.93, pitch: pitch || 1.5 }
      })
    });
    const d = await r.json();
    if (!d.audioContent) { res.status(500).json({error:'No audio returned'}); return; }
    res.json({ audioContent: d.audioContent });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
