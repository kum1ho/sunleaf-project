# Contributing to Sunleaf Project

Дякуємо за інтерес до розвитку проекту Sunleaf! 🍃

## 🚀 Quick Start

```bash
# 1. Fork репозиторій
# 2. Клонувати локально
git clone https://github.com/your-username/sunleaf-project.git
cd sunleaf-project

# 3. Встановити залежності
npm install

# 4. Створити .env файл
cp .env.example .env.local

# 5. Запустити проект
npm run dev
```

## 📝 Development Guidelines

### Code Style

- **TypeScript** обов'язково для нових компонентів
- **ESLint** та **Prettier** для форматування
- **Functional components** з hooks
- **CSS Modules** або **Styled Components**

### Naming Conventions

- **Components**: PascalCase (`ProductCard.tsx`)
- **Functions**: camelCase (`calculatePrice()`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Files**: kebab-case (`product-list.tsx`)

### Commit Messages

Використовуємо [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new product filter functionality
fix: resolve cart calculation bug
docs: update README with API examples
style: improve mobile responsive design
refactor: optimize database queries
test: add unit tests for pricing logic
```

## 🏗 Project Structure

```
src/
├── components/          # React компоненти
│   ├── Header/
│   ├── Catalog/
│   └── ...
├── pages/              # Next.js сторінки
│   ├── api/           # API routes
│   ├── admin/         # Адмін панель
│   └── index.tsx      # Головна сторінка
├── lib/               # Утиліти та хелпери
├── styles/            # Глобальні стилі
└── types/             # TypeScript типи
```

## 🐛 Bug Reports

Перед створенням issue перевірте:

- [ ] Проблема не дублюється
- [ ] Надано кроки для відтворення
- [ ] Вказано версію браузера/Node.js
- [ ] Додано скріншоти (якщо потрібно)

### Bug Report Template

```markdown
**Опис проблеми:**
Короткий опис того, що сталося.

**Кроки для відтворення:**

1. Перейти на сторінку X
2. Натиснути кнопку Y
3. Спостерігати помилку Z

**Очікувана поведінка:**
Що мало б статися.

**Скріншоти:**
Додайте скріншоти якщо потрібно.

**Environment:**

- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js: [e.g. 18.17.0]
```

## ✨ Feature Requests

Для нових функцій створюйте **Feature Request** з описом:

- Мета та користь
- Детальний опис функціоналу
- Mockups або wireframes (якщо є)
- Технічні вимоги

## 🔄 Pull Request Process

1. **Fork** репозиторій
2. Створити **feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit** зміни: `git commit -m 'feat: add amazing feature'`
4. **Push** на branch: `git push origin feature/amazing-feature`
5. Створити **Pull Request**

### PR Guidelines

- [ ] Код пройшов всі тести
- [ ] Додано документацію
- [ ] Оновлено CHANGELOG.md
- [ ] Перевірено на mobile пристроях
- [ ] SEO оптимізація (якщо потрібно)

## 🧪 Testing

```bash
# Запустити тести
npm run test

# Запустити тести з coverage
npm run test:coverage

# E2E тести
npm run test:e2e
```

## 📚 Documentation

- **README.md** - загальна інформація
- **CHANGELOG.md** - історія змін
- **API.md** - документація API
- **DEPLOYMENT.md** - інструкції для deploy

## 🌟 Priority Features

Найвищий пріоритет:

1. 🔐 **Security improvements**
2. 📱 **Mobile optimization**
3. 🚀 **Performance optimizations**
4. ♿ **Accessibility features**
5. 🌍 **Internationalization**

## 💬 Community

- **GitHub Discussions** - для питань та ідей
- **Issues** - для bug reports та feature requests
- **Email**: info@sunleaf.ua

## 📄 License

Цей проект використовує MIT License. Дивіться [LICENSE](LICENSE) файл.

---

**Happy Coding! ☕**
