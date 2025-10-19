const jwt = require('jsonwebtoken');
const { getRequests, updateRequestStatus } = require('../../../lib/requests-storage');
const JWT_SECRET = 'sunleaf_secret_key_2024';

function getToken(req) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/sunleaf_token=([^;]+)/);
  return m ? m[1] : null;
}

module.exports = async function handler(req, res) {
  const token = getToken(req);
  
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Не авторизовано' });
  }

  if (req.method === 'GET') {
    const { type } = req.query;
    const requests = getRequests(type || null);
    return res.status(200).json(requests);
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    const updated = updateRequestStatus(parseInt(id), status);
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(404).json({ error: 'Запит не знайдено' });
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};
