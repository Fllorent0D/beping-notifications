import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { TabtMatchResultUpdatesScrapperService } from '../notifications/tabt-match-result-updates-scrapper.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JobScheduler {
	private readonly logger = new Logger(JobScheduler.name);

	constructor(private readonly eventBus: EventBusService,
							private readonly newsScrapper: TabtMatchResultUpdatesScrapperService) {
	}

	@Cron(CronExpression.EVERY_2_HOURS)
	async weekSchedule() {
		this.logger.log('Week job: Running');
		await this.refreshMatchResultUpdates();
		this.logger.log('Week job: Finished');
	}

	async refreshMatchResultUpdates(): Promise<void> {
		const news = await this.newsScrapper.getLatestMatchResultUpdates();
		this.eventBus.emitEvent({
			type: TabtEventType.MATCH_RESULT_UPDATE,
			payload: {
				latestUpdates: news
			},
			corrId: uuid()
		});
	}

}
