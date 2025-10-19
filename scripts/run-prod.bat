@echo off
setlocal

echo [1/3] Чиста інсталяція залежностей...
npm ci || (echo Помилка npm ci && exit /b 1)

echo [2/3] Збірка...
npm run build || (echo Помилка збірки && exit /b 1)

echo [3/3] Старт прод-сервера...
start "" http://localhost:3000
npm start

endlocal
