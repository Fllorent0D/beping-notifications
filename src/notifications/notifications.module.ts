import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BepingNotifierService } from './beping-notifier.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchNotification } from '../model/notification.entity';
import { NumericRankingNotifierService } from './numeric-ranking-notifier.service';
import { NumericRankingNotificationEntity } from '../model/numeric-ranking-notification.entity';

@Module({
	imports: [
		HttpModule,
		CommonModule,
		TypeOrmModule.forFeature([MatchNotification, NumericRankingNotificationEntity])],
	providers: [
		BepingNotifierService,
		NumericRankingNotifierService,
	],
})
export class NotificationsModule implements OnModuleInit {
	constructor(private readonly numericRankingNotifierService: NumericRankingNotifierService) {
	}

	onModuleInit(): void {
		this.numericRankingNotifierService.start();

	}
}
