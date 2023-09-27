import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchNotification } from '../model/notification.entity';
import { Repository } from 'typeorm';
import { ApiConsumerEntity } from '../model/api-consumer.entity';
import {createHash} from 'crypto';

interface APIConsumer {
	app: string;
	password: string;
}
@Injectable()
export class AuthService {

	constructor(@InjectRepository(ApiConsumerEntity) private readonly apiConsumerRepository: Repository<ApiConsumerEntity>) {
	}

	async findOne(app: string, password: string): Promise<string | undefined> {
		//make sha256 of password
		const hash = Buffer.from(createHash('sha256').update(password).digest('hex')).toString('base64');
		const apiConsumer = await this.apiConsumerRepository.findOne({app, password: hash});
		if (apiConsumer) {
			return apiConsumer.app;
		}
		return undefined;
	}
}
