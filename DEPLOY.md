# Инструкция по деплою

## Вариант 1: Docker Compose (рекомендуется)

1. Убедитесь, что у вас установлен Docker и Docker Compose
2. В корне проекта выполните:
```bash
docker-compose up -d
```

Backend будет доступен на порту 3000, админка на порту 80.

## Вариант 2: PM2 для бэкенда

1. Установите PM2: `npm install -g pm2`
2. В папке `backend`:
```bash
npm install
npm run build
pm2 start ecosystem.config.js
```

## Вариант 3: Ручной деплой

### Backend

1. На сервере установите Node.js 18+
2. Скопируйте папку `backend` на сервер
3. Выполните:
```bash
cd backend
npm install
npm run build
npm run start:prod
```

Или используйте systemd для автозапуска:
```bash
sudo nano /etc/systemd/system/game-backend.service
```

Содержимое:
```ini
[Unit]
Description=Game Backend
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/backend
ExecStart=/usr/bin/node dist/main.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Затем:
```bash
sudo systemctl enable game-backend
sudo systemctl start game-backend
```

### Admin

1. Соберите админку:
```bash
cd admin
npm install
npm run build
```

2. Настройте nginx для раздачи статики из папки `dist`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Настройка мобильного приложения

В файле `mobile/src/services/api.ts` измените `API_URL` на адрес вашего сервера:

```typescript
const API_URL = 'https://your-server.com'; // Замените на ваш URL
```

## Важные замечания

1. **База данных**: SQLite файл `game.db` будет создан автоматически в папке `backend`
2. **CORS**: Убедитесь, что CORS настроен правильно для вашего домена
3. **HTTPS**: Для продакшена рекомендуется использовать HTTPS
4. **Резервное копирование**: Регулярно делайте бэкап файла `game.db`

