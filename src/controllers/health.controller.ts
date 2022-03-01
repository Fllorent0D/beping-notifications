import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller({
	path: 'health',
})
export class HealthController {
	constructor(private health: HealthCheckService,
		private healthIndicator: HttpHealthIndicator,) {
	}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.healthIndicator.pingCheck('AFTT webside accessible', 'https://resultats.aftt.be/'),
		]);
	}


}
