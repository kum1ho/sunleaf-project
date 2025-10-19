// База знань для чат-бота з ключовими словами та відповідями
const CHATBOT_RESPONSES = {
  // Привітання
  greetings: {
    keywords: ['привіт', 'hello', 'hi', 'вітаю', 'доброго', 'добрий'],
    responses: [
      'Привіт! ☕ Я SunBot — ваш помічник у світі преміум кави та чаю! Чим можу допомогти?',
      'Вітаю! 🌟 Радий бачити вас у Sunleaf! Які питання у вас є?'
    ]
  },

  // Ціни на каву
  coffee_prices: {
    keywords: ['ціна кав', 'скільки кав', 'вартість кав'],
    responses: [
      'Ціни на каву:\n☕ Арабіка преміум — від 320 грн/кг\n☕ Робуста — від 280 грн/кг\n☕ Еспресо-бленд — від 350 грн/кг\n\nМінімальне замовлення: 5 кг'
    ]
  },

  // Доставка
  delivery: {
    keywords: ['доставк', 'delivery', 'привезти'],
    responses: [
      'Доставка Sunleaf 🚚\n\n✅ Житомир — БЕЗКОШТОВНО від 2000 грн\n✅ По Україні — Нова Пошта 1-2 дні\n✅ Відправка — протягом 24 годин'
    ]
  },

  // Контакти
  contacts: {
    keywords: ['контакт', 'телефон', 'phone'],
    responses: [
      'Контакти Sunleaf 📞\n\n☎️ +380 67 123-45-67\n📧 info@sunleaf.ua\n📍 м. Житомир, вул. Київська, 75'
    ]
  }
};

// Функція пошуку відповіді
function findBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Шукаємо співпадіння з ключовими словами
  for (const category in CHATBOT_RESPONSES) {
    const data = CHATBOT_RESPONSES[category];
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        const responses = data.responses;
        return { 
          response: responses[Math.floor(Math.random() * responses.length)], 
          category 
        };
      }
    }
  }
  
  // Якщо не знайдено відповіді
  return {
    response: 'Дякую за запитання! 😊\n\nТелефонуйте: +380 67 123-45-67\nEmail: info@sunleaf.ua',
    category: 'fallback'
  };
}

module.exports = { CHATBOT_RESPONSES, findBotResponse };
