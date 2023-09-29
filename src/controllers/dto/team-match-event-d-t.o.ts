import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class TeamMatchEventClub {
	@IsString()
	home: string;

	@IsString()
	away: string;
}

class TeamMatchEventTeam {
	@IsString()
	home: string;

	@IsString()
	away: string;
}

class TeamMatchEventTeamName {
	@IsString()
	home: string;

	@IsString()
	away: string;
}

class TeamMatchEventForfeited {
	@IsBoolean()
	home: boolean;

	@IsBoolean()
	away: boolean;
}

class TeamMatchEventWithdrawn {
	@IsBoolean()
	home: boolean;

	@IsBoolean()
	away: boolean;
}

class TeamMatchEventScore {
	@IsNumber()
	home: number;

	@IsNumber()
	away: number;
}

class TeamMatchEventPlayer {
	@IsNumber()
	position: number;

	@IsNumber()
	uniqueIndex: number;

	@IsString()
	ranking: string;

	@IsNumber()
	victoryCount: number;

	@IsBoolean()
	isForfeited: boolean;
}

class TeamMatchEventPlayerIndex {
	@IsArray()
	@Type(() => Number)
	home: number[];

	@IsArray()
	@Type(() => Number)
	away: number[];
}

class TeamMatchEventSets {
	@IsNumber()
	home: number;

	@IsNumber()
	away: number;
}

class TeamMatchEventIndividualMatchResult {
	@IsNumber()
	position: number;

	@ValidateNested()
	@Type(() => TeamMatchEventPlayerIndex)
	playerIndex: TeamMatchEventPlayerIndex;

	@ValidateNested()
	@Type(() => TeamMatchEventSets)
	sets: TeamMatchEventSets;

	@ValidateNested()
	@Type(() => TeamMatchEventForfeited)
	forfeit: TeamMatchEventForfeited;
}

class TeamMatchEventPlayers {
	@ValidateNested({each: true})
	@Type(() => TeamMatchEventPlayer)
	home: TeamMatchEventPlayer[];

	@ValidateNested({each: true})
	@Type(() => TeamMatchEventPlayer)
	away: TeamMatchEventPlayer[]
}

export class TeamMatchEventDTO {
	@IsString()
	matchId: string;

	@IsNumber()
	weekName: number;

	@IsNumber()
	divisionId: number;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventClub)
	club: TeamMatchEventClub;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventTeam)
	team: TeamMatchEventTeam;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventTeamName)
	teamName: TeamMatchEventTeamName;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventForfeited)
	forfeited: TeamMatchEventForfeited;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventWithdrawn)
	withdrawn: TeamMatchEventWithdrawn;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventScore)
	score: TeamMatchEventScore;

	@ValidateNested()
	@IsObject()
	@Type(() => TeamMatchEventPlayers)
	players: TeamMatchEventPlayers

	@ValidateNested()
	@IsArray()
	@Type(() => TeamMatchEventIndividualMatchResult)
	individualMatchResults: TeamMatchEventIndividualMatchResult[];
}
