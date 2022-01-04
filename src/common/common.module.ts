import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { FirebaseModule } from './firebase/firebase.module';
import { EventBusService } from './event-bus/event-bus.service';

@Module({
	imports: [
		CacheModule.registerAsync({
			useFactory: () => {
				const redisUrl = process.env.REDIS_TLS_URL;
				if (redisUrl) {
					return {
						store: redisStore,
						url: redisUrl,
					};
				} else {
					return null;
				}
			},
		}),
		FirebaseModule,
	],
	providers: [CacheService, EventBusService],
	exports: [CacheService, FirebaseModule, EventBusService],
})
export class CommonModule {}
