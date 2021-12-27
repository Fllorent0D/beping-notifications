import { Module } from '@nestjs/common';
import { TabtNewsScrapperService } from './services/tabt-news-scrapper.service';
import { TabtEventBusService } from './services/tabt-event-bus.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TabtNewsScrapperService, TabtEventBusService],
})
export class NotificationsModule {}
