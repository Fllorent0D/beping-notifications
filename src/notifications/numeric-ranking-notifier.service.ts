import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { MessagingFirebaseService } from '../common/firebase/messaging-firebase.service';
import { CacheService } from '../common/cache/cache.service';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map } from 'rxjs';
import { NumericRankingEventDto } from '../controllers/dto/numeric-ranking-event.dto';
import { NumericRankingNotificationEntity } from '../model/numeric-ranking-notification.entity';
import { NOTIFICATIONS_EN, NOTIFICATIONS_FR, NOTIFICATIONS_NL } from './constants';

@Injectable()
export class NumericRankingNotifierService {
	private readonly logger = new Logger(NumericRankingNotifierService.name);

	constructor(
		private readonly tabtEventBusService: EventBusService,
		private readonly messagingFirebaseService: MessagingFirebaseService,
		private readonly cacheService: CacheService,
		@InjectRepository(NumericRankingNotificationEntity) private readonly numericRankingNotificationEntityRepository: Repository<NumericRankingNotificationEntity>,
	) {
	}

	start(): void {
		this.listenEvents();
	}

	listenEvents(): void {
		this.tabtEventBusService.ofTypes(TabtEventType.NUMERIC_RANKING_RECEIVED)
			.pipe(map((event) => event.payload))
			.subscribe(async (event) => {
				const messageIds = await this.notifyPlayer(event as NumericRankingEventDto);
				this.logger.debug(`Push notification sent to ${(event as NumericRankingEventDto).uniqueIndex} with message ids: ${messageIds}}`);
				await this.numericRankingNotificationEntityRepository.save({
					uniqueIndex: (event as NumericRankingEventDto).uniqueIndex,
					messageIds: messageIds,
					sent: true,
					createdAt: new Date(),
					playerUniqueIndex: (event as NumericRankingEventDto).uniqueIndex,
				});
			});
	}

	async notifyPlayer(event: NumericRankingEventDto): Promise<string[]> {
		// Pick a random notification text
		const notificationText = this.getRandomNotificationText(event);

		return await this.messagingFirebaseService.sendPushNotifications([
			{
				notification: {
					title: 'Classement numérique mis à jour',
					body: notificationText.fr,
				},
				condition: `('ranking_updated_${event.uniqueIndex}' in topics) && ('lang-fr' in topics)`,
			},
			{
				notification: {
					title: 'Numeric ranking updated',
					body: notificationText.en,
				},
				condition: `('ranking_updated_${event.uniqueIndex}' in topics) && ('lang-en' in topics)`,
			},
			{
				notification: {
					title: 'Numerieke ranking bijgewerkt',
					body: notificationText.nl,
				},
				condition: `('ranking_updated_${event.uniqueIndex}' in topics) && ('lang-nl' in topics)`,
			},
		]);
	}

	private getRandomNotificationText(event: NumericRankingEventDto) {
		// random number between 0 and 10
		const random = Math.floor(Math.random() * 10);
		if (event.newRanking > event.oldRanking) {
			return {
				fr: NOTIFICATIONS_FR.winning_points[random].replace('[X]', (event.newRanking - event.oldRanking).toString(10)),
				en: NOTIFICATIONS_EN.winning_points[random].replace('[X]', (event.newRanking - event.oldRanking).toString(10)),
				nl: NOTIFICATIONS_NL.winning_points[random].replace('[X]', (event.newRanking - event.oldRanking).toString(10)),
			};
		} else {
			return {
				fr: NOTIFICATIONS_FR.losing_points[random].replace('[X]', (event.oldRanking - event.newRanking).toString(10)),
				en: NOTIFICATIONS_EN.losing_points[random].replace('[X]', (event.oldRanking - event.newRanking).toString(10)),
				nl: NOTIFICATIONS_NL.losing_points[random].replace('[X]', (event.oldRanking - event.newRanking).toString(10)),
			};
		}

	}
}
