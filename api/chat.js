module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({error:'Method not allowed'}); return; }

  try {
    const { messages, system, model } = req.body;

    // Route to correct provider
    if (model === 'gpt4o') {
      const key = process.env.OPENAI_API_KEY;
      if (!key) { res.status(400).json({error:'No OpenAI key configured'}); return; }
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({ model: 'gpt-4o', max_tokens: 200, messages: [{role:'system',content:system}, ...messages] })
      });
      const d = await r.json();
      res.json({ text: d.choices?.[0]?.message?.content || null, error: d.error?.message || null });
      return;
    }

    if (model === 'gemini') {
      const key = process.env.GEMINI_API_KEY;
      if (!key) { res.status(400).json({error:'No Gemini key configured'}); return; }
      const contents = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: { maxOutputTokens: 200 } })
      });
      const d = await r.json();
      res.json({ text: d.candidates?.[0]?.content?.parts?.[0]?.text || null, error: d.error?.message || null });
      return;
    }

    // Default: Claude
    const key = process.env.ANTHROPIC_KEY;
    if (!key) { res.status(400).json({error:'No Anthropic key configured'}); return; }
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 200, system, messages })
    });
    const d = await r.json();
    res.json({ text: d.content?.[0]?.text || null, error: d.error?.message || null });

  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
