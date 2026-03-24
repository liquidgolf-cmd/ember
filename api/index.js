const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');

  // Inject environment variables into placeholders
  html = html.replace(/__ANTHROPIC_KEY__/g, process.env.ANTHROPIC_KEY || '');
  html = html.replace(/__GOOGLE_TTS_KEY__/g, process.env.GOOGLE_TTS_KEY || '');

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=0');
  res.send(html);
};
