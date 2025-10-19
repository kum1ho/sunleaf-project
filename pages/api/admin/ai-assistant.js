const jwt = require('jsonwebtoken');
const { askAI } = require('../../../lib/github-ai');
const JWT_SECRET = 'sunleaf_secret_key_2024';

function getToken(req) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/sunleaf_token=([^;]+)/);
  return m ? m[1] : null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = getToken(req);
  
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Не авторизовано' });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(400).json({ error: 'Вкажіть питання' });
  }

  console.log('[AI Assistant] Question:', question);

  const answer = await askAI(question);

  console.log('[AI Assistant] Answer:', answer);

  return res.status(200).json({ answer });
};
