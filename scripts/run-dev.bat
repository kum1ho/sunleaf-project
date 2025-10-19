@echo off
setlocal ENABLEDELAYEDEXPANSION

echo [1/4] Перевірка Node/npm...
node -v >NUL 2>&1 || (echo Node.js не знайдено. Встановіть Node 18+ && exit /b 1)
npm -v >NUL 2>&1 || (echo npm не знайдено. Перевірте інсталяцію Node.js && exit /b 1)

echo [2/4] Встановлення залежностей...
npm install || (echo Помилка npm install && exit /b 1)

echo [3/4] Налаштування бази даних...
npm run db:setup || (echo Помилка налаштування БД && exit /b 1)

echo [4/4] Запуск dev-сервера...
start "" http://localhost:3000
npm run dev
endlocal
