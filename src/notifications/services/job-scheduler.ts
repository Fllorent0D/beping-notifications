import { Injectable } from '@nestjs/common';
import { TabtMatchResultUpdatesBusService } from './tabt-match-result-updates-bus.service';
import { TabtMatchResultUpdatesScrapperService } from './tabt-match-result-updates-scrapper.service';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

@Injectable()
export class JobScheduler {
  constructor(
    private readonly eventBus: TabtMatchResultUpdatesBusService,
    private readonly newsScrapper: TabtMatchResultUpdatesScrapperService,
  ) {}

  @Timeout(1000)
  async weekSchedule() {
    console.log('test');
    const news = await this.newsScrapper.getLatestMatchResultUpdates();
    console.log(news);
    this.eventBus.emitEvents(news);
  }
}
