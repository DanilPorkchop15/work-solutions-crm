import { Controller, Get, Param } from "@nestjs/common";
import { USER_LOGS_ROUTES, UserLogApi } from "@work-solutions-crm/libs/shared/user-log/user-log.api";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

import { UserLogService } from "./user-log.service";

@Controller()
export class UserLogController implements UserLogApi {
  constructor(private readonly userLogsService: UserLogService) {}

  @Get(USER_LOGS_ROUTES.findAll(":userId"))
  findAll(@Param("userId") userId: string): Promise<UserLogDTO[]> {
    return this.userLogsService.findAll(userId);
  }
}
