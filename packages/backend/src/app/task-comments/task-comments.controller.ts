import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TASK_COMMENTS_ROUTES, TaskCommentsApi } from "@work-solutions-crm/libs/shared/task-comments/task-comments.api";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comments/task-comments.dto";

@Controller()
export class TaskCommentsController implements TaskCommentsApi {
  @Get(TASK_COMMENTS_ROUTES.findAll(":taskId"))
  findAll(@Param("taskId") taskId: string): Promise<TaskCommentDTO[]> {
    // TODO: Add service logic to fetch all comments for a task
    return Promise.resolve([]);
  }

  @Post(TASK_COMMENTS_ROUTES.create(":taskId"))
  create(@Param("taskId") taskId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic to create a comment for a task
    return Promise.resolve(undefined);
  }

  @Patch(TASK_COMMENTS_ROUTES.update(":taskCommentId"))
  update(@Param("taskCommentId") taskCommentId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic to update a task comment by ID
    return Promise.resolve(undefined);
  }

  @Delete(TASK_COMMENTS_ROUTES.delete(":taskCommentId"))
  delete(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    // TODO: Add service logic to delete a task comment by ID
    return Promise.resolve(undefined);
  }

  @Patch(TASK_COMMENTS_ROUTES.restore(":taskCommentId"))
  restore(@Param("taskCommentId") taskCommentId: string): Promise<void> {
    // TODO: Add service logic to restore a task comment by ID
    return Promise.resolve(undefined);
  }
}
