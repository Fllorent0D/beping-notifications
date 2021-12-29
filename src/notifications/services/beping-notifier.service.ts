import { Injectable } from '@nestjs/common';
import { TabtMatchResultUpdatesBusService } from './tabt-match-result-updates-bus.service';
import { MessagingFirebaseService } from '../../firebase/messaging-firebase.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class BepingNotifierService {
  constructor(
    private readonly matchResultUpdatesBusService: TabtMatchResultUpdatesBusService,
    private readonly messagingFirebaseService: MessagingFirebaseService,
  ) {}

  start(): void {
    this.listenEvents();
  }

  listenEvents(): void {
    this.matchResultUpdatesBusService
      .onEventsChanges()
      .pipe(tap((events) => console.log('EVENT UPDATES', events)))
      .subscribe();
  }
}
