import { Controller, Get, Param } from "@nestjs/common";
import { TASK_LOGS_ROUTES, TaskLogsApi } from "@work-solutions-crm/libs/shared/task-logs/task-logs.api";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-logs/task-logs.dto";

@Controller()
export class TaskLogsController implements TaskLogsApi {
  @Get(TASK_LOGS_ROUTES.findAll(":taskId"))
  findAll(@Param("taskId") taskId: string): Promise<TaskLogDTO[]> {
    // TODO
    return Promise.resolve([]);
  }
}
