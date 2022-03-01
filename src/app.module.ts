import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule, Configuration } from './common/tabt-client';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JobSchedulerModule } from './job-scheduler/job-scheduler.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';

@Module({
	imports: [
		TerminusModule,
		ScheduleModule.forRoot(),
		LoggerModule.forRoot({
			pinoHttp: {
				level: 'debug',
				prettyPrint: {
					translateTime: true,
					ignore: 'pid,hostname',
					singleLine: true,
				},
			},
		}),
		ConfigModule.forRoot(),
		ApiModule.forRoot(() => new Configuration({ basePath: 'https://tabt-rest.floca.be' })),
		JobSchedulerModule,
	],
	controllers: [
		HealthController,
	],
	providers: [],
})
export class AppModule {
}
