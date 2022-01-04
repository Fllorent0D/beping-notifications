import { Module } from '@nestjs/common';
import { TabtMatchResultUpdatesScrapperService } from './tabt-match-result-updates-scrapper.service';
import { HttpModule } from '@nestjs/axios';
import { BepingNotifierService } from './beping-notifier.service';
import { CommonModule } from '../common/common.module';

@Module({
	imports: [HttpModule, CommonModule],
	providers: [
		TabtMatchResultUpdatesScrapperService,
		BepingNotifierService,
	],
	exports: [TabtMatchResultUpdatesScrapperService],
})
export class NotificationsModule {
}
