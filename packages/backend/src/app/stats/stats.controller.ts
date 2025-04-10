import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { STATS_ROUTES, StatsApi } from "@work-solutions-crm/libs/shared/stats/stats.api";
import { StatsDTO } from "@work-solutions-crm/libs/shared/stats/stats.dto";

import { AuthGuard } from "../auth/auth.guard";

import { StatsValidationDTO } from "./stats.dto";
import { StatsService } from "./stats.service";

@Controller()
export class StatsController implements StatsApi {
  constructor(private readonly statsService: StatsService) {}

  @Get(STATS_ROUTES.get())
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get stats" })
  @ApiResponse({ status: 200, type: StatsValidationDTO })
  async get(): Promise<StatsDTO> {
    return this.statsService.getStats();
  }
}
