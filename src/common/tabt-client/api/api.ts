export * from './clubs.service';
import { ClubsService } from './clubs.service';
export * from './divisions.service';
import { DivisionsService } from './divisions.service';
export * from './head2Head.service';
import { Head2HeadService } from './head2Head.service';
export * from './health.service';
import { HealthService } from './health.service';
export * from './internalIdentifiers.service';
import { InternalIdentifiersService } from './internalIdentifiers.service';
export * from './matches.service';
import { MatchesService } from './matches.service';
export * from './members.service';
import { MembersService } from './members.service';
export * from './seasons.service';
import { SeasonsService } from './seasons.service';
export * from './tournaments.service';
import { TournamentsService } from './tournaments.service';
export const APIS = [ClubsService, DivisionsService, Head2HeadService, HealthService, InternalIdentifiersService, MatchesService, MembersService, SeasonsService, TournamentsService];
