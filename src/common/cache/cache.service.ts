import { CACHE_MANAGER, CacheStore, Inject, Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import { DatadogService } from '../logger/datadog.service';

// Durations in Seconds

export enum TTL_DURATION {
  ONE_DAY = 86_400,
  EIGHT_HOURS = 28_800,
  TWELVE_HOURS = 43_200,
  ONE_HOUR = 3_600,
  TWO_HOURS = 7_200,
}

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private static hashKey(key: string): string {
    return createHash('md5').update(key).digest('hex');
  }

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {
  }

  getFromCache<T>(key: string): Promise<T> {
    return this.cacheManager.get(CacheService.hashKey(key)) as Promise<T | undefined>;
  }

  setInCache(key: string, value: any, ttl: number): Promise<void> {
    return this.cacheManager.set(CacheService.hashKey(key), value, { ttl }) as Promise<void>;
  }

  getCacheKey(prefix: string, input: any, db: string): string {
    return `${prefix}-${db}-${JSON.stringify(input)}`;
  }


  async getFromCacheOrGetAndCacheResult<T>(key: string, getter: () => Promise<T>, ttl = 600): Promise<T> {
    const cached = await this.getFromCache<T>(key);

    if (cached) {
      this.logger.debug('Data found in cache');
      return cached;
    }

    this.logger.debug('Data not found in cache');

    const result = await getter();
    await this.setInCache(key, result, ttl);
    return result;
  }

}
