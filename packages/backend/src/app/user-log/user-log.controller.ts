import { AuthGuard } from "@backend/app/auth/auth.guard";
import { CaslGuard } from "@backend/app/permission/casl.guard";
import { UserLogResponseDTO } from "@backend/app/user-log/user-log.dto";
import { CheckPolicies } from "@backend/decorators/check-policies.decorator";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { USER_LOGS_ROUTES, UserLogApi } from "@work-solutions-crm/libs/shared/user-log/user-log.api";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

import { UserLogService } from "./user-log.service";

@ApiTags("User Logs")
@ApiBearerAuth()
@Controller()
export class UserLogController implements UserLogApi {
  constructor(private readonly userLogsService: UserLogService) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.USERS))
  @Get(USER_LOGS_ROUTES.findAll(":userId"))
  @ApiOperation({ summary: "Get all user logs for a given user" })
  @ApiResponse({ status: 200, type: [UserLogResponseDTO] })
  findAll(@Param("userId") userId: string): Promise<UserLogDTO[]> {
    return this.userLogsService.findAll(userId);
  }
}
