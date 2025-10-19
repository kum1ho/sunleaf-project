const { addRequest } = require('../../../lib/requests-storage');

module.exports = async function handler(req, res) {
  console.log('[ChatBot Register] Method:', req.method);
  console.log('[ChatBot Register] Headers:', req.headers);
  console.log('[ChatBot Register] Body:', req.body);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, phone, businessType } = req.body || {};

  console.log('[ChatBot Register] Parsed data:', { name, phone, businessType });

  if (!name || !phone) {
    console.log('[ChatBot Register] Missing required fields');
    return res.status(400).json({ success: false, error: 'Вкажіть імʼя та телефон' });
  }

  try {
    // Зберігаємо запит (якщо модуль доступний)
    try {
      const { addRequest } = require('../../../lib/requests-storage');
      addRequest({
        type: 'chatbot-registration',
        name,
        phone,
        businessType,
        source: 'SunBot',
      });
      console.log('[ChatBot Register] Request saved to storage');
    } catch (storageError) {
      console.log('[ChatBot Register] Storage not available:', storageError.message);
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const message = `Чудово, ${name}! 🎉 Тепер можете ставити будь-які питання про каву, чай, доставку та ціни. SunBot завжди на звʼязку! ☕`;

    console.log('[ChatBot Register] Success! SessionId:', sessionId);

    return res.status(200).json({ 
      success: true, 
      message,
      sessionId
    });
  } catch (error) {
    console.error('[ChatBot Register] Unexpected error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Помилка сервера', 
      details: error.message 
    });
  }
};
