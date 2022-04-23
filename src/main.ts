import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BepingNotifierService } from './notifications/beping-notifier.service';
import { Logger } from 'nestjs-pino';
import { JobScheduler } from './scheduler/job-scheduler';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	app.useLogger(app.get(Logger));

	await app.listen( process.env.PORT || 3000);

	app.get(BepingNotifierService).start();
	await app.get(JobScheduler).refreshMatchResultUpdates();
}

bootstrap();
