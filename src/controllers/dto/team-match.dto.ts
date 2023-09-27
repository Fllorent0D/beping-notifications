import { IsArray, IsBoolean, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Player {
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

export class IndividualMatchResult {
	@IsNumber()
	position: number;

	@IsString({each: true})
	homePlayerMatchIndex: Array<string>;
	@IsString({each: true})
	homePlayerUniqueIndex: Array<string>;
	@IsString({each: true})
	awayPlayerMatchIndex: Array<string>;
	@IsString({each: true})
	awayPlayerUniqueIndex: Array<string>;

	@IsNumber()
	homeSetCount: number;
	@IsNumber()
	awaySetCount: number;

	@IsBoolean()
	isHomeForfeited: boolean;
	@IsBoolean()
	isAwayForfeited: boolean;

	@IsString()
	scores: string;
}

export class MatchDetails {
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => Player)
	homePlayers: Array<Player>;
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => Player)
	awayPlayers: Array<Player>;

	@IsArray()
	@ValidateNested({each: true})
	@Type(() => IndividualMatchResult)
	individualMatchResults: Array<IndividualMatchResult>;

	@IsNumber()
	homeScore: number;
	@IsNumber()
	awayScore: number;
}

export class TeamMatchDTO {
	@IsString()
	matchId: string;
	@IsNumber()
	weekName: number;

	@IsNumber()
	divisionId: number;

	@IsString()
	homeClub: string;
	@IsString()
	homeTeam: string;
	@IsString()
	awayClub: string;
	@IsString()
	awayTeam: string;

	@IsString()
	score: string;

	@IsBoolean()
	isHomeForfeited: boolean;
	@IsBoolean()
	isAwayForfeited: boolean;
	@IsBoolean()
	isHomeWithdrawn: boolean;
	@IsBoolean()
	isAwayWithdrawn: boolean;

	@IsObject()
	@Type(() => MatchDetails)
	matchDetails?: MatchDetails;

}



