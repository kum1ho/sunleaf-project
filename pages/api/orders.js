export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer, items, total } = req.body || {};

    if (!customer?.name || !customer?.phone || !items || items.length === 0) {
      return res.status(400).json({ error: 'Недостатньо даних' });
    }

    console.log('[Orders] New order:', {
      customer: customer.name,
      phone: customer.phone,
      items: items.length,
      total
    });

    // Тут буде надсилання email/telegram/збереження в БД
    // await sendEmail(...)
    // await saveToDatabase(...)

    return res.status(200).json({ 
      success: true,
      orderId: 'ORD-' + Date.now(),
      message: 'Замовлення успішно прийнято!' 
    });
  } catch (error) {
    console.error('[Orders] Error:', error);
    return res.status(500).json({ error: 'Помилка сервера' });
  }
}
