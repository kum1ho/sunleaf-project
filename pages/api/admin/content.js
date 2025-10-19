export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { section, data } = req.body || {};

    if (!section || !data) {
      return res.status(400).json({ error: 'Секція та дані обовʼязкові' });
    }

    console.log('[Content API] Saving content:', { section, data });

    // Here you would save to database/file system
    // For now, just simulate success
    
    return res.status(200).json({
      success: true,
      section,
      message: `Контент секції "${section}" успішно збережено`
    });
  } catch (error) {
    console.error('[Content API] Error:', error);
    return res.status(500).json({ error: 'Помилка збереження контенту' });
  }
}
