import { Module } from '@nestjs/common';
import { TabtMatchResultUpdatesScrapperService } from './services/tabt-match-result-updates-scrapper.service';
import { TabtMatchResultUpdatesBusService } from './services/tabt-match-result-updates-bus.service';
import { HttpModule } from '@nestjs/axios';
import { JobScheduler } from './services/job-scheduler';
import { ScheduleModule } from '@nestjs/schedule';
import { BepingNotifierService } from './services/beping-notifier.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [HttpModule, ScheduleModule, FirebaseModule],
  providers: [
    TabtMatchResultUpdatesScrapperService,
    TabtMatchResultUpdatesBusService,
    JobScheduler,
    BepingNotifierService,
  ],
  exports: [BepingNotifierService],
})
export class NotificationsModule {}
