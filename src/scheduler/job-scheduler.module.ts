import { Module } from '@nestjs/common';
import { JobScheduler } from './/job-scheduler';
import { CommonModule } from '../common/common.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
	imports: [CommonModule, NotificationsModule],
	providers: [
		JobScheduler,
	],
	exports: [JobScheduler],
})
export class JobSchedulerModule {
}
