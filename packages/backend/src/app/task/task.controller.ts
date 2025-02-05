import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  TaskCreateValidationDTO,
  TaskPreviewResponseDTO,
  TaskResponseDTO,
  TaskUpdateValidationDTO
} from "@backend/app/task/task.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  TaskApi,
  TaskBulkDeleteRequestDTO,
  TaskBulkRestoreRequestDTO,
  TASKS_ROUTES,
} from "@work-solutions-crm/libs/shared/task/task.api";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";

import { TaskService } from "./task.service";

@ApiTags("Tasks")
@ApiBearerAuth()
@Controller()
export class TaskController implements TaskApi {
  constructor(private readonly tasksService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get(TASKS_ROUTES.findAll())
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: 200, type: [TaskPreviewResponseDTO] })
  async findAll(): Promise<TaskPreviewDTO[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(TASKS_ROUTES.findOne(":taskId"))
  @ApiOperation({ summary: "Get task by id" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async findOne(@Param("taskId") taskId: string): Promise<TaskDTO> {
    return this.tasksService.findOne(taskId);
  }

  @UseGuards(AuthGuard)
  @Post(TASKS_ROUTES.create())
  @ApiOperation({ summary: "Create task" })
  @ApiResponse({ status: 201, type: TaskResponseDTO })
  async create(@Body() dto: TaskCreateValidationDTO): Promise<TaskDTO> {
    return this.tasksService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(TASKS_ROUTES.update(":taskId"))
  @ApiOperation({ summary: "Update task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async update(@Param("taskId") taskId: string, @Body() dto: TaskUpdateValidationDTO): Promise<TaskDTO> {
    return this.tasksService.update(taskId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(TASKS_ROUTES.delete(":taskId"))
  @ApiOperation({ summary: "Delete task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 204 })
  async delete(@Param("taskId") taskId: string): Promise<void> {
    return this.tasksService.delete(taskId);
  }

  @UseGuards(AuthGuard)
  @Patch(TASKS_ROUTES.restore(":taskId"))
  @ApiOperation({ summary: "Restore task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 204 })
  async restore(@Param("taskId") taskId: string): Promise<void> {
    return this.tasksService.restore(taskId);
  }

  @Delete(TASKS_ROUTES.bulkDelete())
  async bulkDelete(@Body() dto: TaskBulkDeleteRequestDTO): Promise<void> {
    return this.tasksService.bulkDelete(dto);
  }

  @Patch(TASKS_ROUTES.bulkRestore())
  async bulkRestore(@Body() dto: TaskBulkRestoreRequestDTO): Promise<void> {
    return this.tasksService.bulkRestore(dto);
  }
}
