import { AuthGuard } from "@backend/app/auth/auth.guard";
import { TaskLogResponseDTO } from "@backend/app/task-log/task-log.dto";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TASK_LOGS_ROUTES, TaskLogApi } from "@work-solutions-crm/libs/shared/task-log/task-log.api";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-log/task-log.dto";

import { TaskLogService } from "./task-log.service";

@ApiTags("Task Logs")
@ApiBearerAuth()
@Controller()
export class TaskLogController implements TaskLogApi {
  constructor(private readonly taskLogsService: TaskLogService) {}

  @UseGuards(AuthGuard)
  @Get(TASK_LOGS_ROUTES.findAll(":taskId"))
  @ApiOperation({ summary: "Retrieve all task logs for a specific task" })
  @ApiResponse({ status: 200, description: "Successfully retrieved task logs", type: [TaskLogResponseDTO] })
  async findAll(@Param("taskId") taskId: string): Promise<TaskLogDTO[]> {
    return this.taskLogsService.findAll(taskId);
  }
}
