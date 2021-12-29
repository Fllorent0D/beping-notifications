import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { MatchResultUpdate } from '../models/update-event.model';

@Injectable()
export class TabtMatchResultUpdatesScrapperService {
  constructor(private readonly httpService: HttpService) {}

  async getLatestMatchResultUpdates(): Promise<MatchResultUpdate[]> {
    const page: string = await firstValueFrom(
      this.httpService
        .post<string>(`https://resultats.aftt.be`, {
          responseType: 'text',
          maxRedirects: 0,
        })
        .pipe(map((response) => response.data)),
    );
    const regexMatches = /\/match\/([0-9]+)/gi;
    const matchIds: number[] = Array.from(page.matchAll(regexMatches), (item) =>
      Number(item[1]),
    );

    const regexDate = /([0-9]{2})-([0-9]{2})&nbsp;([0-9]{2}):([0-9]{2})/gi;
    const dates = Array.from(
      page.matchAll(regexDate),
      (item) => `${item[1]}/${item[2]}-${item[3]}:${item[4]}`,
    );

    return matchIds.map((id, index) => ({
      matchUniqueId: id,
      updateTime: dates[index],
    }));
  }
}
