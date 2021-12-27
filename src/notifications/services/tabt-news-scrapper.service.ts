import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TabtNewsScrapperService {
  constructor(private readonly httpService: HttpService) {}

  async getLatestMatchUpdated(): Promise<number[]> {
    const page: string = await firstValueFrom(
      this.httpService
        .post<string>(`https://resultats.aftt.be`, {
          responseType: 'text',
          maxRedirects: 0,
        })
        .pipe(map((response) => response.data)),
    );
    const regex = /\/match\/([0-9]+)/gi;
    const matchIds: number[] = Array.from(page.matchAll(regex), (item) =>
      Number(item[1]),
    );
    /*
    const domParser = new DOMParser({ errorHandler: () => void 0 });
    const dom = domParser.parseFromString(result.data, 'text/html');
    const matchListDiv = dom
      .getElementById('latest_changes')
      .getElementsByTagName('DBTable_Selectable');
    //.getElementsByClassName('DBTable_Selectable');*/

    return matchIds;
  }
}
