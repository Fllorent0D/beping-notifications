import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { TabtMatchResultUpdatesScrapperService } from '../notifications/tabt-match-result-updates-scrapper.service';
import { Cron } from '@nestjs/schedule';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { v4 as uuid } from 'uuid';

/*
		* * * * * *
		| | | | | |
		| | | | | day of week
		| | | | month
		| | | day of month
		| | hour
		| minute
		second (optional)
*/

@Injectable()
export class JobScheduler {
	private readonly logger = new Logger(JobScheduler.name);

	constructor(private readonly eventBus: EventBusService,
							private readonly newsScrapper: TabtMatchResultUpdatesScrapperService) {
	}

	@Cron('0 * * * 1-5')
	async weekSchedule() {
		this.logger.log('Week job: Running');
		await this.refreshMatchResultUpdates();
		this.logger.log('Week job: Finished');
	}

	/*
	@Cron('0 * * * * *')
	async testSchedule() {
		this.logger.log('Week job: Running');
		await this.refreshMatchResultUpdates();
		this.logger.log('Week job: Finished');
	}
	*/

	@Cron('*/5 * * * 6,7')
	async weekendSchedule() {
		this.logger.log('Weekend job: Running');
		await this.refreshMatchResultUpdates();
		this.logger.log('Weekend job: Finished');
	}

	async refreshMatchResultUpdates(): Promise<void> {
		const news = await this.newsScrapper.getLatestMatchResultUpdates();
		this.eventBus.emitEvent({
			type: TabtEventType.MATCH_RESULT_UPDATE,
			payload: {
				latestUpdates: news,
			},
			corrId: uuid(),
		});
	}

}
