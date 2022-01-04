import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { ConditionMessage } from 'firebase-admin/lib/messaging';

@Injectable()
export class MessagingFirebaseService {
	private readonly logger = new Logger(MessagingFirebaseService.name);

	constructor(private readonly configService: ConfigService) {
	}

	async sendPushNotification(message: ConditionMessage) {
		try {
			const isProd = this.configService.get<string>('NODE_ENV') === 'prod';
			await admin.messaging().send(message, !isProd);
			this.logger.log(`Push "${message.notification?.title}" sent to ${message.condition}`);
		} catch (e) {
			this.logger.error(`Error when sending push to ${message.condition}`, e.stack,);
		}
	}
}
