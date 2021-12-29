import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache/cache.service';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

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
    ConfigModule,
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CommonModule {}
