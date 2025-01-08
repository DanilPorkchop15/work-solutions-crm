import { Controller, Get, Param } from "@nestjs/common";
import { USER_LOGS_ROUTES, UserLogsApi } from "@work-solutions-crm/libs/shared/user-logs/user-logs.api";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-logs/user-logs.dto";

@Controller()
export class UserLogsController implements UserLogsApi {
  @Get(USER_LOGS_ROUTES.findAll(":userId"))
  findAll(@Param("userId") userId: string): Promise<UserLogDTO[]> {
    return Promise.resolve([]);
  }
}
