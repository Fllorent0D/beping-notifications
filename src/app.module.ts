import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule, Configuration } from './common/tabt-client';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JobSchedulerModule } from './job-scheduler/job-scheduler.module';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		LoggerModule.forRoot({
			pinoHttp: {
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
	controllers: [],
	providers: [],
})
export class AppModule {
}
