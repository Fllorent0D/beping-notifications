import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventBusService } from '../common/event-bus/event-bus.service';
import { TabtEventType } from '../common/event-bus/models/event.model';
import { v4 as uuid } from 'uuid';
import { TeamMatchDTO } from './dto/team-match.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('event')
export class TeamMatchEventController{
	constructor(private readonly eventBusService: EventBusService,) {
	}



	@Post('team-match')
	@UseGuards(AuthGuard('basic'))
	@UsePipes(new ValidationPipe({ transform: true }))
	async teamMatchEvent(@Body() teamMatchEvent: TeamMatchDTO,) {
		const corrId = uuid();

		this.eventBusService.emitEvent({
			type: TabtEventType.MATCH_RESULT_RECEIVED,
			payload: teamMatchEvent,
			corrId,
		})

		return {
			acknowledged: true,
			correlationId: corrId,
		}
	}


}
