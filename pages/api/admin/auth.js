export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  // Оновлені дані для входу
  if (username === 'admin' && password === 'sasha24041984') {
    return res.status(200).json({ 
      success: true,
      token: 'admin_authenticated_' + Date.now()
    });
  }

  return res.status(401).json({ 
    success: false,
    error: 'Невірний логін або пароль' 
  });
}
