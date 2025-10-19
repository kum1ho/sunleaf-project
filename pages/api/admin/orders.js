const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sunleaf_secret_key_2024';

function getToken(req) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/sunleaf_token=([^;]+)/);
  return m ? m[1] : null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = getToken(req);
  
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Не авторизовано' });
  }

  // Мокові замовлення
  const mockOrders = [
    { id: 1001, order_number: '1001', client_name: 'Кав\'ярня "Аромат"', total: 12500, status: 'delivered', created_at: '2024-01-15' },
    { id: 1002, order_number: '1002', client_name: 'Ресторан "Подолянь"', total: 8700, status: 'processing', created_at: '2024-01-16' },
    { id: 1003, order_number: '1003', client_name: 'Готель "Житомир"', total: 15600, status: 'pending', created_at: '2024-01-17' },
    { id: 1004, order_number: '1004', client_name: 'Офіс "IT Solutions"', total: 4200, status: 'delivered', created_at: '2024-01-18' },
    { id: 1005, order_number: '1005', client_name: 'Магазин "Продукти+"', total: 9800, status: 'processing', created_at: '2024-01-19' },
  ];

  return res.status(200).json(mockOrders);
};
