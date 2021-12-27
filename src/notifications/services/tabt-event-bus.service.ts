import { Injectable } from '@nestjs/common';
import { distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { TabtNewsScrapperService } from './tabt-news-scrapper.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TabtEventBusService {
  tabtEvents$: Observable<any>;

  private _tabEventsFromCron$: Subject<number[]>;

  constructor(private readonly newsScrapperService: TabtNewsScrapperService) {
    this._tabEventsFromCron$ = new Subject<any>();
    this.tabtEvents$ = this._tabEventsFromCron$.pipe(
      distinctUntilChanged((a, b) => a !== b),
      tap((a) => console.log('BUS:::', a)),
    );
    this.tabtEvents$.subscribe();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async fetchNews() {
    const matches = await this.newsScrapperService.getLatestMatchUpdated();
    this._tabEventsFromCron$.next(matches);
  }
}
