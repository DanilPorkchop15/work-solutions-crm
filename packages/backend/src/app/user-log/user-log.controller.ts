import { AuthGuard } from "@backend/app/auth/auth.guard";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { USER_LOGS_ROUTES, UserLogApi } from "@work-solutions-crm/libs/shared/user-log/user-log.api";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

import { UserLogService } from "./user-log.service";

@ApiTags("User Logs")
@ApiBearerAuth()
@Controller()
export class UserLogController implements UserLogApi {
  constructor(private readonly userLogsService: UserLogService) {}

  @UseGuards(AuthGuard)
  @Get(USER_LOGS_ROUTES.findAll(":userId"))
  @ApiOperation({ summary: "Get all user logs for a given user" })
  // @ApiResponse({ status: 200, type: [UserLogDTO] })
  findAll(@Param("userId") userId: string): Promise<UserLogDTO[]> {
    return this.userLogsService.findAll(userId);
  }
}
