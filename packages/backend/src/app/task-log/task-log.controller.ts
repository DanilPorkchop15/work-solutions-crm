import { Controller, Get, Param } from "@nestjs/common";
import { TASK_LOGS_ROUTES, TaskLogApi } from "@work-solutions-crm/libs/shared/task-log/task-log.api";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-log/task-log.dto";

import { TaskLogService } from "./task-log.service";

@Controller()
export class TaskLogController implements TaskLogApi {
  constructor(private readonly taskLogsService: TaskLogService) {}

  @Get(TASK_LOGS_ROUTES.findAll(":taskId"))
  async findAll(@Param("taskId") taskId: string): Promise<TaskLogDTO[]> {
    return this.taskLogsService.findAll(taskId);
  }
}
