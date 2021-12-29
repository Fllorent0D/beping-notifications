import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessagingFirebaseService {
  constructor(private readonly configService: ConfigService) {}

  async sendPushNotification(message: string, topic: string) {
    const isProd = this.configService.get<string>('NODE_ENV') === 'prod';
    await admin.messaging().sendToTopic(isProd ? topic : `test_${topic}`, {
      notification: { body: message },
    });
  }
}
