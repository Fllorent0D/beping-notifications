import { Module } from '@nestjs/common';
import { TabtMatchResultUpdatesScrapperService } from './tabt-match-result-updates-scrapper.service';
import { HttpModule } from '@nestjs/axios';
import { BepingNotifierService } from './beping-notifier.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchNotification } from '../model/notification.entity';

@Module({
	imports: [HttpModule, CommonModule, TypeOrmModule.forFeature([MatchNotification])],
	providers: [
		TabtMatchResultUpdatesScrapperService,
		BepingNotifierService,
	],
	exports: [TabtMatchResultUpdatesScrapperService],
})
export class NotificationsModule {
}
