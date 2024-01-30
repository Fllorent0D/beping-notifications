import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { MessagingFirebaseService } from '../common/firebase/messaging-firebase.service';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { delay, firstValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMatchNotificationEntity } from '../model/team-match-notification.entity';
import { Repository } from 'typeorm';
import { TeamMatchEventDTO } from '../controllers/dto/team-match-event-d-t.o';
import { NOTIFICATIONS_EN, NOTIFICATIONS_FR, NOTIFICATIONS_NL } from './constants';
import { MatchesService, TeamMatchesEntry } from '../common/tabt-client';

@Injectable()
export class TeamMatchEventNotifierService {
	private readonly logger = new Logger(TeamMatchEventNotifierService.name);

	constructor(
		private readonly tabtEventBusService: EventBusService,
		private readonly messagingFirebaseService: MessagingFirebaseService,
		private readonly matchesService: MatchesService,
		@InjectRepository(TeamMatchNotificationEntity) private readonly matchNotificationRepository: Repository<TeamMatchNotificationEntity>,
	) {
	}

	start(): void {
		this.listenEvents();
	}

	listenEvents(): void {
		this.tabtEventBusService
			.ofTypes<TeamMatchEventDTO>(TabtEventType.MATCH_RESULT_RECEIVED)
			.pipe(
				map((event) => event.payload),
				delay(1000 * 60 * 2)
			).subscribe(async (eventDTO: TeamMatchEventDTO) => {
				this.logger.log(eventDTO, 'Team match event received for ' + eventDTO.MatchUniqueId);
				try {
					const findNotifications = await this.matchNotificationRepository.findOne({
						matchUniqueId: eventDTO.MatchUniqueId.toString(10),
					});
					if (findNotifications) {
						this.logger.warn(`Match ${eventDTO.MatchUniqueId} already notified. Skipping...`);
						return;
					}

					const { data: match } = await firstValueFrom(this.matchesService.findMatchById(eventDTO.MatchUniqueId));

					if (
						match.IsAwayForfeited ||
						match.IsHomeForfeited ||
						match.IsHomeWithdrawn ||
						match.IsAwayForfeited
					) {
						this.logger.warn(`Match ${match.MatchUniqueId} is ff/fg. Adding to cache but will not sending notifications`);
						await this.matchNotificationRepository.insert({
							matchUniqueId: match.MatchUniqueId.toString(10),
							createdAt: new Date(),
							sent: false,
						});
						return;
					}

					this.logger.log(`Match ${match.MatchUniqueId} is not ff/fg. Sending notifications...`);
					const messageIds = await this.notifyMatch(match);
					await this.matchNotificationRepository.insert({
						createdAt: new Date(),
						matchUniqueId: match.MatchUniqueId.toString(10),
						messageIds: messageIds,
						sent: true,
					});

				} catch (err) {
					this.logger.error(err.message, err.stack);
				}
			});
	}

	async notifyMatch(match: TeamMatchesEntry): Promise<string[]> {
		const text = this.getRandomNotificationText(match);
		this.logger.log(`Sending notifications for match ${match.MatchUniqueId} with text: ${text.fr}`);
		return await this.messagingFirebaseService.sendPushNotifications([
			{
				notification: {
					title: 'Résultat du match',
					body: text.fr,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-fr' in topics`,
			},
			{
				notification: {
					title: 'Match result',
					body: text.en,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-en' in topics`,
			},
			{
				notification: {
					title: 'Wedstrijdresultaat',
					body: text.nl,
				},
				condition: `${this.topicConditionForMatch(match)} && 'lang-nl' in topics`,
			},
		]);
	}

	private getRandomNotificationText(match: TeamMatchesEntry) {
		// random number between 0 and 10
		const random = Math.floor(Math.random() * NOTIFICATIONS_FR.team_match_result.length);
		const splittedScore = match.Score.split('-');
		if (splittedScore.length !== 2) {
			throw new Error('Score is not valid');
		}
		const [homeScore, awayScore] = splittedScore;

		if (
			homeScore !== awayScore
		) {
			return {
				fr: NOTIFICATIONS_FR.team_match_result[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[result]', homeScore > awayScore ? 'gagné' : 'perdu')
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
				en: NOTIFICATIONS_EN.team_match_result[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[result]', homeScore > awayScore ? 'win' : 'lost')
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
				nl: NOTIFICATIONS_NL.team_match_result[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[result]', homeScore > awayScore ? 'gewonnen' : 'verloren')
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
			};
		} else {
			return {
				fr: NOTIFICATIONS_FR.draw_match[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
				en: NOTIFICATIONS_EN.draw_match[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
				nl: NOTIFICATIONS_NL.draw_match[random]
					.replace('[hometeam]', match.HomeTeam
						.replace('[awayteam]', match.AwayTeam)
						.replace('[homescore]', homeScore.toString())
						.replace('[awayscore]', awayScore.toString())),
			};
		}

	}

	topicConditionForMatch(match: TeamMatchesEntry): string {
		return `('club-${match.HomeClub}' in topics || 'club-${match.AwayClub}' in topics || 'match-${match.MatchUniqueId}' in topics || 'division-${match.DivisionId.toString(10)}' in topics)`;
	}
}
