import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BepingNotifierService } from './notifications/services/beping-notifier.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const notifier = app.get(BepingNotifierService);
  notifier.start();
}

bootstrap();
