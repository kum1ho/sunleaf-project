const { getChatbotAnalytics } = require('../../../lib/chatbot-database');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const analytics = getChatbotAnalytics();
    
    // Додаткові розрахунки
    const insights = {
      peakHours: Object.entries(analytics.hourlyStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([hour, count]) => ({ hour: parseInt(hour), count })),
      
      efficiency: 100 - analytics.fallbackRate,
      
      recommendations: []
    };

    // Генеруємо рекомендації
    if (analytics.fallbackRate > 20) {
      insights.recommendations.push('Високий відсоток невідповідних запитів. Розширте базу знань.');
    }
    
    if (analytics.totalInteractions > 100) {
      insights.recommendations.push('Активна взаємодія з ботом. Розгляньте додавання нових категорій.');
    }

    return res.status(200).json({
      ...analytics,
      insights
    });
  } catch (error) {
    console.error('[Chatbot Analytics] Error:', error);
    return res.status(500).json({ error: 'Помилка отримання аналітики' });
  }
}
