import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule, Configuration } from './common/tabt-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JobSchedulerModule } from './scheduler/job-scheduler.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchNotification } from './model/notification.entity';

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
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					host: configService.get('POSTGRES_HOST'),
					port: parseInt(configService.get('POSTGRES_PORT')),
					username: configService.get('POSTGRES_USER'),
					password: configService.get('POSTGRES_PASSWORD'),
					database: configService.get('POSTGRES_DATABASE'),
					entities: [MatchNotification],
					//entities: ['**/*.entity{.ts,.js}'],
					//migrationsTableName: 'migration',
					//migrations: ['src/migration/*.ts'],
					cli: {
						migrationsDir: 'src/migration',
					},
					synchronize: true,
					//ssl: configService.get('NODE_ENV') === 'prod',
				};
			},
			inject: [ConfigService],
			imports: [ConfigModule],
		}),
		JobSchedulerModule,
	],
	controllers: [
		HealthController,
	],
	providers: [],
})
export class AppModule {
}
