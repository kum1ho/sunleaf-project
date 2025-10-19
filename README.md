<<<<<<< HEAD
<<<<<<< HEAD
# 🍃 Sunleaf - Оптові поставки преміум кави та чаю

![Sunleaf Banner](https://via.placeholder.com/1200x300/0057B7/FFD700?text=Sunleaf+Ukraine)

> **Професійний корпоративний сайт для B2B продажу кави, чаю та солодощів у Житомирі**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://sunleaf-project.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge)](https://github.com/kum1ho/sunleaf-project)

## 🌟 Особливості проекту

- ✅ **Next.js 14** з TypeScript
- ✅ **Responsive дизайн** для всіх пристроїв
- ✅ **SEO оптимізація** + Schema.org markup
- ✅ **Адмін-панель** з повним CRUD функціоналом
- ✅ **Чат-бот** з базою знань
- ✅ **Корзина покупок** та система замовлень
- ✅ **Калькулятор економії** для клієнтів
- ✅ **Імпорт з 1C** та управління каталогом
- ✅ **Аналітика** та звітність

## 🚀 Швидкий старт

```bash
# Клонування
git clone https://github.com/kum1ho/sunleaf-project.git
cd sunleaf-project

# Встановлення залежностей
npm install

# Запуск в режимі розробки
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## 🔑 Доступ до адміністрування

- **URL:** `/admin`
- **Логін:** `admin`
- **Пароль:** `sasha24041984`

## 📊 Функціонал адмін-панелі

| Розділ          | Опис                      | Статус    |
| --------------- | ------------------------- | --------- |
| 📊 Dashboard    | Статистика та KPI         | ✅ Готово |
| 📦 Замовлення   | Управління замовленнями   | ✅ Готово |
| ☕ Товари       | CRUD операції з каталогом | ✅ Готово |
| 👥 Клієнти      | CRM система               | ✅ Готово |
| 📝 Контент      | Редагування тексту сайту  | ✅ Готово |
| 📥 Імпорт 1C    | Завантаження з бази даних | ✅ Готово |
| 📈 Аналітика    | Детальні звіти            | ✅ Готово |
| ⚙️ Налаштування | Конфігурація системи      | ✅ Готово |

## 🛠 Технології

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** CSS Modules + Inline Styles
- **Backend:** Next.js API Routes
- **Database:** File-based JSON (готово до MongoDB/PostgreSQL)
- **Deploy:** Vercel Ready

## 📱 Основні компоненти

```
src/
├── components/
│   ├── Header/           # Навігація та меню
│   ├── Hero/             # Головний баннер
│   ├── Catalog/          # Каталог товарів з фільтрами
│   ├── Benefits/         # Переваги компанії
│   ├── Reviews/          # Відгуки клієнтів
│   ├── SavingsCalculator/ # Калькулятор економії
│   ├── ChatBot/          # AI чат-бот
│   ├── Cart/             # Корзина покупок
│   └── Contacts/         # Форми зв'язку
├── pages/
│   ├── admin/            # Адмін-панель
│   ├── api/              # Backend API
│   └── product/          # Сторінки товарів
└── lib/                  # Утиліти та хелпери
```

## 🌐 Deploy на Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kum1ho/sunleaf-project)

### Змінні середовища для Vercel:

```bash
# Адмін доступ
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Email налаштування
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@sunleaf.ua

# Загальні
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## 📈 Бізнес-функції

### 🛒 E-commerce

- Каталог з 100+ товарів
- Корзина та оформлення замовлень
- Калькулятор економії клієнта
- Система знижок для постійних клієнтів

### 🤖 Автоматизація

- Чат-бот з базою знань (20+ категорій)
- Автоматичний імпорт з 1C
- Email сповіщення про замовлення
- Аналітика поведінки користувачів

### 📊 CRM система

- Управління клієнтами
- Історія замовлень
- Сегментація за типом бізнесу
- Персональні знижки

## 🎯 Цільова аудиторія

- ☕ **Кав'ярні** та кофейні
- 🍽️ **Ресторани** та кафе
- 🏨 **Готелі** та хостели
- 🏢 **Офіси** та бізнес-центри
- 🏪 **Роздрібні мережі**

## 📞 Контакти

- **Демо:** https://sunleaf-project.vercel.app
- **GitHub:** https://github.com/kum1ho/sunleaf-project
- **Email:** info@sunleaf.ua
- **Телефон:** +380 67 123-45-67
- **Адреса:** м. Житомир, вул. Київська, 75

## 🔧 Команди

```bash
# Розробка
npm run dev          # Запуск dev сервера
npm run build        # Збірка для продакшену
npm run start        # Запуск prod версії
npm run lint         # Перевірка коду

# Deploy
git add .
git commit -m "Update"
git push origin main  # Auto deploy на Vercel
```

## 📄 Ліцензія

MIT License - використовуйте вільно для комерційних цілей.

## 🚀 Roadmap

- [ ] Інтеграція з реальною базою даних
- [ ] Система платежів (LiqPay, Stripe)
- [ ] Mobile app (React Native)
- [ ] AI рекомендації товарів
- [ ] Мультимовність (EN, PL)

---

**Made with ❤️ for Ukrainian business by [kum1ho](https://github.com/kum1ho)**

⭐ **Поставте зірочку, якщо проект був корисний!**
=======
# sunleaf-project
My website
>>>>>>> 804d8d4637cb014265a36c69f51a09c2cd28329e
=======
# sunleaf-project
>>>>>>> b563affe0dfe52952140f72369d987b0a1105b2a
