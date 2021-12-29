import { Injectable } from '@nestjs/common';
import { distinctUntilChanged, Observable, share, Subject } from 'rxjs';
import { TabtMatchResultUpdatesScrapperService } from './tabt-match-result-updates-scrapper.service';
import { MatchesService } from '../../tabt-client';
import { MatchResultUpdate } from '../models/update-event.model';

@Injectable()
export class TabtMatchResultUpdatesBusService extends Subject<
  MatchResultUpdate[]
> {
  constructor(
    private readonly newsScrapperService: TabtMatchResultUpdatesScrapperService,
    private readonly matchService: MatchesService,
  ) {
    super();
  }

  onEventsChanges(): Observable<MatchResultUpdate[]> {
    return this.pipe(
      distinctUntilChanged(
        (a, b) =>
          a.length === b.length &&
          a.every(
            (item: MatchResultUpdate, index: number) => item === b[index],
          ),
      ),
      share(),
    );
  }

  emitEvents(events: MatchResultUpdate[]) {
    this.next(events);
  }
}
