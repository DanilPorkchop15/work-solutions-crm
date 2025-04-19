import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { TASK_COMMENTS_ROUTES, TaskCommentApi } from "@work-solutions-crm/libs/shared/task-comment/task-comment.api";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comment/task-comment.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  TaskCommentCreateValidationDTO,
  TaskCommentResponseDTO,
  TaskCommentUpdateValidationDTO
} from "./task-comment.dto";
import { TaskCommentService } from "./task-comment.service";

@ApiTags("Task Comments")
@ApiBearerAuth()
@Controller()
export class TaskCommentController implements TaskCommentApi {
  constructor(
    private readonly taskCommentsService: TaskCommentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard)
  @Get(TASK_COMMENTS_ROUTES.findAll(":taskId"))
  @ApiOperation({ summary: "Find all comments for a task" })
  @ApiParam({ name: "taskId", required: true, description: "The ID of the task" })
  @ApiResponse({ status: 200, type: [TaskCommentResponseDTO] })
  @Logger("findAll", "task comments")
  async findAll(@Param("taskId") taskId: string): Promise<TaskCommentDTO[]> {
    return this.taskCommentsService.findAll(taskId);
  }

  @UseGuards(AuthGuard)
  @Post(TASK_COMMENTS_ROUTES.create(":taskId"))
  @ApiOperation({ summary: "Create a new comment for a task" })
  @ApiParam({ name: "taskId", required: true, description: "The ID of the task" })
  async create(
    @Param("taskId") taskId: string,
    @Body() { text }: TaskCommentCreateValidationDTO,
    @CurrentUser() user: User
  ): Promise<void> {
    await this.taskCommentsService.create(taskId, user.user_id, text);
    await this.loggerService.logByType(
      LogType.TASK,
      "прокомментировано",
      `Пользователь (${user.user_id}) оставил комментарий к задаче (${taskId}): "${text}"`,
      {
        task_id: taskId,
        user_id: user.user_id
      }
    );
  }

  @UseGuards(AuthGuard)
  @Patch(TASK_COMMENTS_ROUTES.update(":taskCommentId"))
  @ApiOperation({ summary: "Update a task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  @Logger("update", "task comment")
  async update(
    @Param("taskCommentId") taskCommentId: string,
    @Body() { text }: TaskCommentUpdateValidationDTO
  ): Promise<void> {
    return this.taskCommentsService.update(taskCommentId, text);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.TASKS))
  @Delete(TASK_COMMENTS_ROUTES.delete(":taskCommentId"))
  @ApiOperation({ summary: "Delete a task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  @Logger("delete", "task comment")
  async delete(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.delete(taskCommentId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.TASKS))
  @Patch(TASK_COMMENTS_ROUTES.restore(":taskCommentId"))
  @ApiOperation({ summary: "Restore a deleted task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  @Logger("restore", "task comment")
  async restore(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.restore(taskCommentId);
  }
}
