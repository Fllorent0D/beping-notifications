import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TeamMatchEventNotifierService } from './team-match-event-notifier.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NumericRankingNotifierService } from './numeric-ranking-notifier.service';
import { NumericRankingNotificationEntity } from '../model/numeric-ranking-notification.entity';
import { TeamMatchNotificationEntity } from '../model/team-match-notification.entity';

@Module({
	imports: [
		HttpModule,
		CommonModule,
		TypeOrmModule.forFeature([TeamMatchNotificationEntity, NumericRankingNotificationEntity])],
	providers: [
		TeamMatchEventNotifierService,
		NumericRankingNotifierService,
	],
})
export class NotificationsModule implements OnModuleInit {
	constructor(private readonly numericRankingNotifierService: NumericRankingNotifierService,
		private readonly teamMatchEventNotifierService: TeamMatchEventNotifierService,) {
	}

	onModuleInit(): void {
		this.numericRankingNotifierService.start();
		this.teamMatchEventNotifierService.start();
	}
}
