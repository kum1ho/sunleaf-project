export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Простий токен перевірка без NextAuth
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies.sunleaf_token;

  if (!token || !token.startsWith('admin_authenticated_')) {
    return res.status(401).json({ error: 'Не авторизовано' });
  }

  try {
    // Отримуємо статистику
    const stats = {
      ordersCount: 127,
      clientsCount: 45, 
      totalRevenue: 487500,
      monthlyGrowth: 18.5
    };

    console.log('[Admin Stats] Returning stats:', stats);
    return res.status(200).json(stats);
  } catch (error) {
    console.error('[Admin Stats] Error:', error);
    return res.status(500).json({ error: 'Помилка отримання статистики' });
  }
}
