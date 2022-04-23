import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { ConditionMessage } from 'firebase-admin/lib/messaging';

@Injectable()
export class MessagingFirebaseService {
	private readonly logger = new Logger(MessagingFirebaseService.name);

	constructor(private readonly configService: ConfigService) {
	}

	async sendPushNotification(message: ConditionMessage): Promise<string> {
		try {
			const isProd = this.configService.get<string>('NODE_ENV') === 'prod';
			const messageId = await admin.messaging().send(message, !isProd);
			this.logger.debug(`Push "${message.notification?.title}" sent to ${message.condition}`);
			return messageId;
		} catch (e) {
			this.logger.error(`Error when sending push to ${message.condition}`, e.stack);
		}
	}

	async sendPushNotifications(messages: ConditionMessage[]): Promise<string[]> {
		try {
			const isProd = this.configService.get<string>('NODE_ENV') === 'prod';
			const messageIds = await admin.messaging().sendAll(messages, !isProd);
			for (const message of messageIds.responses) {
				if (message.success) {
					this.logger.debug(`Push to "${message.messageId}" sent: ${message.success}`);
				} else {
					this.logger.warn(`Push to "${message.messageId}" failed! Error: ${message.error}`);
				}
			}
			return messageIds.responses.map((r) => r.messageId);
		} catch (e) {
			this.logger.error(`Error when sending batch notification`, e.stack);
		}
	}
}
