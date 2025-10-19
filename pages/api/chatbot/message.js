const { findBotResponse } = require('../../../lib/chatbot-database');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { message, sessionId } = req.body || {};

  console.log('[ChatBot Message] Request:', { message, sessionId });

  if (!message || !sessionId) {
    return res.status(400).json({ error: 'Невірний запит' });
  }

  try {
    // Отримуємо відповідь з бази знань
    const { response: botReply, category } = findBotResponse(message);
    
    console.log('[ChatBot Message] Category:', category, 'Reply length:', botReply.length);

    // Зберігаємо повідомлення для адміна
    try {
      const { addRequest } = require('../../../lib/requests-storage');
      addRequest({
        type: 'chatbot-message',
        message,
        sessionId,
        reply: botReply,
        category,
        source: 'SunBot Database',
      });
    } catch (storageError) {
      console.log('[ChatBot Message] Storage not available');
    }

    // Перевіряємо чи потрібен живий консультант
    const needsHumanKeywords = 'менеджер|консультант|людина|зателефонуйте|передзвоніть|складно|не зрозумів|не знаю|живий|оператор';
    const needsHuman = category === 'fallback' || 
                       new RegExp(needsHumanKeywords, 'i').test(message) || 
                       category === 'consultation';

    return res.status(200).json({ 
      reply: botReply,
      needsHuman,
      category,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[ChatBot Message] Error:', error);
    return res.status(500).json({ 
      reply: 'Вибачте, виникла помилка. Зв\'яжіться з менеджером: +380 67 123-45-67 📞',
      needsHuman: true,
    });
  }
};
