import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  TaskCommentCreateValidationDTO,
  TaskCommentResponseDTO,
  TaskCommentUpdateValidationDTO
} from "@backend/app/task-comment/task-comment.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TASK_COMMENTS_ROUTES, TaskCommentApi } from "@work-solutions-crm/libs/shared/task-comment/task-comment.api";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comment/task-comment.dto";

import { TaskCommentService } from "./task-comment.service";

@ApiTags("Task Comments")
@ApiBearerAuth()
@Controller()
export class TaskCommentController implements TaskCommentApi {
  constructor(private readonly taskCommentsService: TaskCommentService) {}

  @UseGuards(AuthGuard)
  @Get(TASK_COMMENTS_ROUTES.findAll(":taskId"))
  @ApiOperation({ summary: "Find all comments for a task" })
  @ApiParam({ name: "taskId", required: true, description: "The ID of the task" })
  @ApiResponse({ status: 200, type: [TaskCommentResponseDTO] })
  async findAll(@Param("taskId") taskId: string): Promise<TaskCommentDTO[]> {
    return this.taskCommentsService.findAll(taskId);
  }

  @UseGuards(AuthGuard)
  @Post(TASK_COMMENTS_ROUTES.create(":taskId"))
  @ApiOperation({ summary: "Create a new comment for a task" })
  @ApiParam({ name: "taskId", required: true, description: "The ID of the task" })
  async create(@Param("taskId") taskId: string, @Body() { text }: TaskCommentCreateValidationDTO): Promise<void> {
    // TODO get user id from auth
    return this.taskCommentsService.create(taskId, "userId", text);
  }

  @UseGuards(AuthGuard)
  @Patch(TASK_COMMENTS_ROUTES.update(":taskCommentId"))
  @ApiOperation({ summary: "Update a task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  async update(
    @Param("taskCommentId") taskCommentId: string,
    @Body() { text }: TaskCommentUpdateValidationDTO
  ): Promise<void> {
    return this.taskCommentsService.update(taskCommentId, text);
  }

  @UseGuards(AuthGuard)
  @Delete(TASK_COMMENTS_ROUTES.delete(":taskCommentId"))
  @ApiOperation({ summary: "Delete a task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  async delete(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.delete(taskCommentId);
  }

  @UseGuards(AuthGuard)
  @Patch(TASK_COMMENTS_ROUTES.restore(":taskCommentId"))
  @ApiOperation({ summary: "Restore a deleted task comment" })
  @ApiParam({ name: "taskCommentId", required: true, description: "The ID of the task comment" })
  async restore(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.restore(taskCommentId);
  }
}
