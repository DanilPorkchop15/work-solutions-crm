import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { TaskApi, TASKS_ROUTES } from "@work-solutions-crm/libs/shared/task/task.api";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  TaskBulkDeleteValidationDTO,
  TaskBulkRestoreValidationDTO,
  TaskCreateValidationDTO,
  TaskPreviewResponseDTO,
  TaskResponseDTO,
  TaskUpdateValidationDTO
} from "./task.dto";
import { TaskService } from "./task.service";

@ApiTags("Tasks")
@ApiBearerAuth()
@Controller()
export class TaskController implements TaskApi {
  constructor(
    private readonly tasksService: TaskService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.TASKS))
  @Get(TASKS_ROUTES.findAll())
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: 200, type: [TaskPreviewResponseDTO] })
  @Logger("findAll", "Tasks")
  async findAll(): Promise<TaskPreviewDTO[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.TASKS))
  @Get(TASKS_ROUTES.findOne(":taskId"))
  @ApiOperation({ summary: "Get task by id" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  @Logger("findOne", "Task")
  async findOne(@Param("taskId") taskId: string): Promise<TaskDTO> {
    return this.tasksService.findOne(taskId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.CREATE, Subject.TASKS))
  @Post(TASKS_ROUTES.create())
  @ApiOperation({ summary: "Create task" })
  @ApiResponse({ status: 201, type: TaskResponseDTO })
  async create(@Body() dto: TaskCreateValidationDTO, @CurrentUser() user: User): Promise<TaskDTO> {
    const taskDto: TaskDTO = await this.tasksService.create(dto);
    await this.loggerService.logByType(LogType.TASK, "создано", `Задача была создана (${taskDto.id})`, {
      task_id: taskDto.id,
      user_id: user.user_id
    });
    return taskDto;
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.TASKS))
  @Patch(TASKS_ROUTES.update(":taskId"))
  @ApiOperation({ summary: "Update task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 200, type: TaskResponseDTO })
  async update(
    @Param("taskId") taskId: string,
    @Body() dto: TaskUpdateValidationDTO,
    @CurrentUser() user: User
  ): Promise<TaskDTO> {
    const taskDto: TaskDTO = await this.tasksService.update(taskId, dto);
    await this.loggerService.logByType(LogType.TASK, "обновлено", `Задача была успешно (${taskDto.id})`, {
      task_id: taskId,
      user_id: user.user_id
    });
    return taskDto;
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.TASKS))
  @Delete(TASKS_ROUTES.delete(":taskId"))
  @ApiOperation({ summary: "Delete task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 204 })
  async delete(@Param("taskId") taskId: string, @CurrentUser() user: User): Promise<void> {
    await this.tasksService.delete(taskId);
    await this.loggerService.logByType(LogType.TASK, "удалено", `Задача была удалена (${taskId})`, {
      task_id: taskId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.TASKS))
  @Patch(TASKS_ROUTES.restore(":taskId"))
  @ApiOperation({ summary: "Restore task" })
  @ApiParam({ name: "taskId", type: String })
  @ApiResponse({ status: 204 })
  async restore(@Param("taskId") taskId: string, @CurrentUser() user: User): Promise<void> {
    await this.tasksService.restore(taskId);
    await this.loggerService.logByType(LogType.TASK, "восстановлено", `Задача была восстановлена (${taskId})`, {
      task_id: taskId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.TASKS))
  @Delete(TASKS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Bulk delete tasks" })
  @ApiBody({ type: TaskBulkDeleteValidationDTO })
  async bulkDelete(@Body() dto: TaskBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.tasksService.bulkDelete(dto);
    for (const taskId of dto.task_ids) {
      await this.loggerService.logByType(LogType.TASK, "пакетное удаление", `Задачи были удалены (${taskId})`, {
        task_id: taskId,
        user_id: user.user_id
      });
    }
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.TASKS))
  @Patch(TASKS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore tasks" })
  @ApiBody({ type: TaskBulkRestoreValidationDTO })
  async bulkRestore(@Body() dto: TaskBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.tasksService.bulkRestore(dto);
    for (const taskId of dto.task_ids) {
      await this.loggerService.logByType(
        LogType.TASK,
        "пакетное восстановление",
        `Задачи были восстановлены (${taskId})`,
        {
          task_id: taskId,
          user_id: user.user_id
        }
      );
    }
  }
}
