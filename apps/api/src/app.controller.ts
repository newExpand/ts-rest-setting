import { Controller } from '@nestjs/common';
import { TsRestHandler } from '@ts-rest/nest';
import { apiContract } from '@repo/api-contract';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TsRestHandler(apiContract.health.check)
  healthCheck() {
    return {
      status: 200 as const,
      body: {
        status: 'ok' as const,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    };
  }
}
