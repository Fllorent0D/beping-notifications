export interface MatchResultUpdate {
	matchUniqueId: number;
	updateTime: string;
}
export interface LatestMatchUpdatePayload{
	latestUpdates: MatchResultUpdate[];
}

export enum TabtEventType {
	MATCH_RESULT_UPDATE = 'MATCH_RESULT_UPDATE',
}

export interface TabtEvent<T = TabtEventPayloadTypes> {
	type: TabtEventType,
	payload: T;
	corrId: string;
}

export type TabtEventPayloadTypes = LatestMatchUpdatePayload;
