import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from './notifications/notifications.module';
import { ApiModule, Configuration } from './tabt-client';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    ApiModule.forRoot(
      () => new Configuration({ basePath: 'https://tabt-rest.floca.be' }),
    ),
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
