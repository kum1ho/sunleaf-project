import { query } from '../../lib/database';
import { sendMail } from '../../lib/email';
const { addRequest } = require('../../lib/requests-storage');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Заповніть обовʼязкові поля' });
    }

    console.log('[Contact] New request:', { name, email, phone });

    // Зберігаємо запит в адмін-панель
    try {
      const { addRequest } = require('../../lib/requests-storage');
      addRequest({
        type: 'contact-form',
        name,
        company: '',
        email,
        phone,
        businessType: '',
        message,
        cart: null,
        total: null,
        source: 'Контактна форма',
      });
      console.log('[Contact API] ✅ Request saved to admin panel');
    } catch (storageError) {
      console.log('[Contact API] ⚠️ Storage error:', storageError.message);
    }

    // Надсилаємо email (якщо налаштовано)
    try {
      const { sendMail } = require('../../lib/email');
      const emailContent = `Нова заявка:\n\nІмʼя: ${name}\nКомпанія: ${company || 'Не вказано'}\nEmail: ${email}\nТелефон: ${phone || 'Не вказано'}\nТип бізнесу: ${businessType || 'Не вказано'}\nПовідомлення: ${message || 'Немає'}`;

      await sendMail({
        to: process.env.CONTACT_EMAIL || 'info@sunleaf.ua',
        subject: 'Нова заявка з Sunleaf',
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br/>'),
      });
      console.log('[Contact API] ✅ Email sent');
    } catch (emailError) {
      console.log('[Contact API] ⚠️ Email failed:', emailError.message);
    }

    return res.status(200).json({ 
      success: true,
      message: 'Заявка успішно відправлена!' 
    });
  } catch (error) {
    console.error('[Contact] Error:', error);
    return res.status(500).json({ error: 'Помилка сервера' });
  }
}
