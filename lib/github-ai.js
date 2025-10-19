const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const MODEL = process.env.OPENROUTER_MODEL || 'z-ai/glm-4.5-air:free';

async function askAI(prompt) {
  try {
    console.log('[AI OpenRouter] Requesting with model:', MODEL);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://sunleaf.ua',
        'X-Title': 'Sunleaf AI Assistant',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: `Ти SunBot ☕ — дружній AI-консультант компанії Sunleaf (оптові поставки преміум кави, чаю, солодощів).

Твоя роль:
- Відповідай на питання про продукцію, ціни, доставку
- Будь дружнім, використовуй емоджі ☕🍵🍫
- Відповідай КОРОТКО (1-3 речення)
- Українською мовою
- Якщо не знаєш точної відповіді — запропонуй зв'язатись з менеджером

Основна інформація:
• Кава: Арабіка (320 грн/кг), Робуста (280 грн/кг), Еспресо-бленди (350 грн/кг), Капсули (45 грн/уп)
• Чай: Чорний (180 грн/кг), Зелений (220 грн/кг), Преміум (400+ грн/кг)
• Солодощі: Шоколад (450 грн/кг), Цукерки (380 грн/кг), Сиропи (120 грн/л)
• Доставка: Безкоштовно по Житомиру від 2000 грн, по Україні через Нову Пошту 1-2 дні
• Мінімальне замовлення: 5 кг
• Контакти: +380 67 123-45-67, +380 63 765-43-21, info@sunleaf.ua
• Адреса: м. Житомир, вул. Київська, 75`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.7,
        top_p: 0.9,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI OpenRouter] API Error:', response.status, errorText);
      return 'Вибачте, зараз я перевантажений 😅 Краще зв\'яжіться з нашим менеджером за номером +380 67 123-45-67 або заповніть форму на сайті!';
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || 'Не зміг сформувати відповідь. Зв\'яжіться з менеджером!';
    
    console.log('[AI OpenRouter] Success:', aiReply.substring(0, 100));
    return aiReply;
  } catch (error) {
    console.error('[AI OpenRouter] Error:', error.message);
    return `На жаль, зараз я не можу відповісти 😔 Але наші менеджери допоможуть! Телефонуйте: +380 67 123-45-67 ☎️`;
  }
}

module.exports = { askAI };