import { Controller, Get, Param } from "@nestjs/common";
import { TASK_LOGS_ROUTES, TaskLogsApi } from "@work-solutions-crm/libs/shared/task-logs/task-logs.api";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-logs/task-logs.dto";

import { TaskLogsService } from "./task-logs.service";

@Controller()
export class TaskLogsController implements TaskLogsApi {
  constructor(private readonly taskLogsService: TaskLogsService) {}

  @Get(TASK_LOGS_ROUTES.findAll(":taskId"))
  async findAll(@Param("taskId") taskId: string): Promise<TaskLogDTO[]> {
    return this.taskLogsService.findAll(taskId);
  }
}
