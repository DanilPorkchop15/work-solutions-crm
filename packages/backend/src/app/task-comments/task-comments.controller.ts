import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TASK_COMMENTS_ROUTES, TaskCommentsApi } from "@work-solutions-crm/libs/shared/task-comments/task-comments.api";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comments/task-comments.dto";

import { TaskCommentsService } from "./task-comments.service";

@Controller()
export class TaskCommentsController implements TaskCommentsApi {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Get(TASK_COMMENTS_ROUTES.findAll(":taskId"))
  async findAll(@Param("taskId") taskId: string): Promise<TaskCommentDTO[]> {
    return this.taskCommentsService.findAll(taskId);
  }

  @Post(TASK_COMMENTS_ROUTES.create(":taskId"))
  async create(@Param("taskId") taskId: string, @Body("text") text: string): Promise<void> {
    // TODO get user id from auth
    return this.taskCommentsService.create(taskId, "userId", text);
  }

  @Patch(TASK_COMMENTS_ROUTES.update(":taskCommentId"))
  async update(@Param("taskCommentId") taskCommentId: string, @Body("text") text: string): Promise<void> {
    return this.taskCommentsService.update(taskCommentId, text);
  }

  @Delete(TASK_COMMENTS_ROUTES.delete(":taskCommentId"))
  async delete(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.delete(taskCommentId);
  }

  @Patch(TASK_COMMENTS_ROUTES.restore(":taskCommentId"))
  async restore(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    return this.taskCommentsService.restore(taskCommentId);
  }
}
