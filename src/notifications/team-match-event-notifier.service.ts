import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { MessagingFirebaseService } from '../common/firebase/messaging-firebase.service';
import { CacheService } from '../common/cache/cache.service';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { TeamMatchesEntry } from '../common/tabt-client';
import { map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMatchNotificationEntity } from '../model/team-match-notification.entity';
import { Repository } from 'typeorm';
import { TeamMatchEventDTO } from '../controllers/dto/team-match-event-d-t.o';
import { NumericRankingEventDto } from '../controllers/dto/numeric-ranking-event.dto';
import { NOTIFICATIONS_EN, NOTIFICATIONS_FR, NOTIFICATIONS_NL } from './constants';

@Injectable()
export class TeamMatchEventNotifierService {
	private readonly logger = new Logger(TeamMatchEventNotifierService.name);

	constructor(
		private readonly tabtEventBusService: EventBusService,
		private readonly messagingFirebaseService: MessagingFirebaseService,
		private readonly cacheService: CacheService,
		@InjectRepository(TeamMatchNotificationEntity) private readonly matchNotificationRepository: Repository<TeamMatchNotificationEntity>,
	) {
	}

	start(): void {
		this.listenEvents();
	}

	listenEvents(): void {
		this.tabtEventBusService
			.ofTypes<TeamMatchEventDTO>(TabtEventType.MATCH_RESULT_RECEIVED)
			.pipe(map((event) => event.payload))
			.subscribe(async (match: TeamMatchEventDTO) => {
				this.logger.log(match, 'Team match event received');
				try {
					const findNotifications = await this.matchNotificationRepository.findOne({
						matchUniqueId: match.matchId,
					});
					if (findNotifications) {
						this.logger.warn(`Match ${match.matchId} already notified. Skipping...`);
						return;
					}
					if (
						match.forfeited.home ||
						match.forfeited.away ||
						match.withdrawn.home ||
						match.withdrawn.away
					) {
						this.logger.warn(`Match ${match.matchId} is ff/fg. Adding to cache but will not sending notifications`);
						await this.matchNotificationRepository.insert({
							matchUniqueId: match.matchId,
							createdAt: new Date(),
							sent: false,
						});
						return;
					}

					this.logger.log(`Match ${match.matchId} is not ff/fg. Sending notifications...`);
					const messageIds = await this.notifyMatch(match);
					await this.matchNotificationRepository.insert({
						createdAt: new Date(),
						matchUniqueId: match.matchId,
						messageIds: messageIds,
						sent: true,
					});

				} catch (err) {
					this.logger.error(err.message, err.stack);
				}
			});
	}

	async notifyMatch(match: TeamMatchEventDTO): Promise<string[]> {
		const text = this.getRandomNotificationText(match);
		this.logger.log(`Sending notifications for match ${match.matchId} with text: ${text.fr}`)
		return await this.messagingFirebaseService.sendPushNotifications([
			{
				notification: {
					title: "Résultat du match",
					body: text.fr
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-fr' in topics`,
			},
			{
				notification: {
					title: "Match result",
					body: text.en
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-en' in topics`,
			},
			{
				notification: {
					title: "Wedstrijdresultaat",
					body: text.nl
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-nl' in topics`,
			},
		]);
	}

	private getRandomNotificationText(event: TeamMatchEventDTO) {
		// random number between 0 and 10
		const random = Math.floor(Math.random() * NOTIFICATIONS_FR.team_match_result.length);
		if (event.score.home !== event.score.away) {
			return {
				fr: NOTIFICATIONS_FR.team_match_result[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'gagné' : 'perdu')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
				en: NOTIFICATIONS_EN.team_match_result[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'won' : 'lost')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
				nl: NOTIFICATIONS_NL.team_match_result[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'gewonnen' : 'verloren')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
			};
		} else {
			return {
				fr: NOTIFICATIONS_FR.draw_match[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'gagné' : 'perdu')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
				en: NOTIFICATIONS_EN.draw_match[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'won' : 'lost')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
				nl: NOTIFICATIONS_NL.draw_match[random]
					.replace('[hometeam]', event.team.home)
					.replace('[awayteam]', event.team.away)
					.replace('[result]', event.score.home > event.score.away ? 'gewonnen' : 'verloren')
					.replace('[homescore]', event.score.home.toString(10))
					.replace('[awayscore]', event.score.away.toString(10)),
			};
		}

	}

	topicConditionForMatch(match: TeamMatchEventDTO): string {
		return `('club-${match.club.home}' in topics || 'club-${match.club.away}' in topics || 'match-${match.matchId}' in topics || 'division-${match.divisionId.toString(10)}' in topics)`;
	}
}
