import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LOGGER_ROUTES, LoggerApi } from "@work-solutions-crm/libs/shared/logger/logger.api";

import { LogResponseDTO } from "./logger.dto";
import { LoggerService } from "./logger.service";

@Controller()
@ApiTags()
export class LoggerController implements LoggerApi {
  constructor(private readonly loggerService: LoggerService) {}

  @Get(LOGGER_ROUTES.latest())
  @ApiOperation({ summary: "Get logs" })
  @ApiResponse({ status: 200, type: [LogResponseDTO] })
  async latest(): Promise<LogResponseDTO[]> {
    return this.loggerService.getLatest();
  }
}
