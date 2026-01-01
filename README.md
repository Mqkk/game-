# Игра для Иры 🎁

Новогодняя игра-приключение с кубиком и картой.

## Структура проекта

- `mobile/` - React Native приложение
- `backend/` - NestJS API
- `admin/` - Веб-админка

### Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

Backend будет доступен на http://localhost:3000

### Admin (Web)

```bash
cd admin
npm install
npm run dev
```

Админка будет доступна на http://localhost:3001

### Mobile (React Native)

```bash
cd mobile
npm install
# Для iOS
npm run ios
# Для Android
npm run android
```

**Важно**: В файле `mobile/src/services/api.ts` измените `API_URL` на адрес вашего сервера перед запуском на устройстве.