import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for mobile app and admin
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.listen(3000, '0.0.0.0'); // Слушаем на всех интерфейсах для доступа с мобильных устройств
  console.log('Backend server running on http://localhost:3000');
  console.log('Also accessible from network devices');
}
bootstrap();

