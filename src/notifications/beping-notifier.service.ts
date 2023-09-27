import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { MessagingFirebaseService } from '../common/firebase/messaging-firebase.service';
import { CacheService } from '../common/cache/cache.service';
import { LatestMatchUpdatePayload, MatchResultUpdate, TabtEventType } from '../common/event-bus/models/event.model';
import { MatchesService, TeamMatchesEntry } from '../common/tabt-client';
import { distinctUntilChanged, firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchNotification } from '../model/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BepingNotifierService {
	private readonly logger = new Logger(BepingNotifierService.name);

	constructor(
		private readonly tabtEventBusService: EventBusService,
		private readonly messagingFirebaseService: MessagingFirebaseService,
		private readonly cacheService: CacheService,
		@InjectRepository(MatchNotification) private readonly matchNotificationRepository: Repository<MatchNotification>,
		private readonly matchesService: MatchesService,
	) {
	}

	start(): void {
		this.listenEvents();
	}

	listenEvents(): void {
		this.tabtEventBusService
			.ofTypes<LatestMatchUpdatePayload>(TabtEventType.MATCH_RESULT_UPDATE)
			.pipe(map((event) => event.payload),
				distinctUntilChanged((a: LatestMatchUpdatePayload, b: LatestMatchUpdatePayload) =>
					a?.latestUpdates?.length === b?.latestUpdates?.length &&
					a.latestUpdates.every((item: MatchResultUpdate, index: number) =>
						item.matchUniqueId === b?.[index]?.matchUniqueId &&
						item.updateTime === b?.[index]?.updateTime)))
			.subscribe(async (events: LatestMatchUpdatePayload) => {
				this.logger.log(events, 'Updates received');
				for (const event of events.latestUpdates) {
					try {
						const findNotifications = await this.matchNotificationRepository.count({
							matchUniqueId: event.matchUniqueId,
							matchUpdateTime: event.updateTime,
						});
						if (findNotifications > 0) {
							this.logger.debug(`Update ${event.matchUniqueId} ${event.updateTime} already treated. Skipping...`);
							continue;
						}
						const { data: match }: AxiosResponse<TeamMatchesEntry> =
							await firstValueFrom(this.matchesService.findMatchById(event.matchUniqueId));

						if (
							match.IsAwayForfeited ||
							match.IsHomeForfeited ||
							match.IsAwayWithdrawn ||
							match.IsHomeWithdrawn
						) {
							this.logger.warn(`Match ${event.matchUniqueId} is ff/fg. Adding to cache but will not sending notifications`);
							await this.matchNotificationRepository.insert({
								matchUniqueId: event.matchUniqueId,
								matchUpdateTime: event.updateTime,
								isForfait: true,
								sent: false,
							});
							continue;
						}

						if (match.Score && match.IsValidated) {
							this.logger.log(`Match ${event.matchUniqueId} has a score. Notifying...`);
							const messageIds = await this.notifyMatch(match);
							await this.matchNotificationRepository.insert({
								matchUniqueId: event.matchUniqueId,
								matchUpdateTime: event.updateTime,
								messageIds: messageIds,
								isForfait: false,
								sent: true,
							});
						} else {
							await this.matchNotificationRepository.insert({
								matchUniqueId: event.matchUniqueId,
								matchUpdateTime: event.updateTime,
								isForfait: false,
								sent: false,
							});
						}
					} catch (err) {
						this.logger.error(err.message, err.stack);
					}
				}
			});
	}

	async notifyMatch(match: TeamMatchesEntry): Promise<string[]> {
		return await this.messagingFirebaseService.sendPushNotifications([
			{
				notification: {
					body: `${match.HomeTeam} - ${match.AwayTeam} (${match.Score}) match terminé`,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-fr' in topics`,
			},
			{
				notification: {
					body: `${match.HomeTeam} - ${match.AwayTeam} (${match.Score}) game over`,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-en' in topics`,
			},
			{
				notification: {
					body: `${match.HomeTeam} - ${match.AwayTeam} (${match.Score}) game over`,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-nl' in topics`,
			},
		]);
	}

	topicConditionForMatch(match: TeamMatchesEntry): string {
		return `('club-${match.AwayClub}' in topics || 'club-${match.HomeClub}' in topics || 'match-${match.MatchId}' in topics || 'division-${match.DivisionId.toString(10)}' in topics)`;
	}
}
