import { TeamMatchDTO } from '../../../controllers/dto/team-match.dto';
import { NumericRankingEventDto } from '../../../controllers/dto/numeric-ranking-event.dto';

export interface MatchResultUpdate {
	matchUniqueId: number;
	updateTime: Date;
}
export interface LatestMatchUpdatePayload{
	latestUpdates: MatchResultUpdate[];
}

export enum TabtEventType {
	MATCH_RESULT_UPDATE = 'MATCH_RESULT_UPDATE',
	MATCH_RESULT_RECEIVED  = 'MATCH_RESULT_RECEIVED',
	NUMERIC_RANKING_RECEIVED = 'NUMERIC_RANKING_RECEIVED',
}

export interface TabtEvent<T = TabtEventPayloadTypes> {
	type: TabtEventType,
	payload: T;
	corrId: string;
}

export type TabtEventPayloadTypes = LatestMatchUpdatePayload | TeamMatchDTO | NumericRankingEventDto;
