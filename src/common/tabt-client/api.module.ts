import { DynamicModule, HttpService, HttpModule, Module, Global } from '@nestjs/common';
import { Configuration } from './configuration';

import { ClubsService } from './api/clubs.service';
import { DivisionsService } from './api/divisions.service';
import { Head2HeadService } from './api/head2Head.service';
import { HealthService } from './api/health.service';
import { InternalIdentifiersService } from './api/internalIdentifiers.service';
import { MatchesService } from './api/matches.service';
import { MembersService } from './api/members.service';
import { SeasonsService } from './api/seasons.service';
import { TournamentsService } from './api/tournaments.service';

@Global()
@Module({
  imports:      [ HttpModule ],
  exports:      [
    ClubsService,
    DivisionsService,
    Head2HeadService,
    HealthService,
    InternalIdentifiersService,
    MatchesService,
    MembersService,
    SeasonsService,
    TournamentsService
  ],
  providers: [
    ClubsService,
    DivisionsService,
    Head2HeadService,
    HealthService,
    InternalIdentifiersService,
    MatchesService,
    MembersService,
    SeasonsService,
    TournamentsService
  ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): DynamicModule {
        return {
            module: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( httpService: HttpService) { }
}
