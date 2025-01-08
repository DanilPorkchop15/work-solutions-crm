import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  PROJECT_COMMENTS_ROUTES,
  ProjectCommentsApi
} from "@work-solutions-crm/libs/shared/project-comments/project-comments.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comments/project-comments.dto";

@Controller()
export class ProjectCommentsController implements ProjectCommentsApi {
  @Get(PROJECT_COMMENTS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectCommentDTO[]> {
    // TODO: Add service logic for fetching all comments for a specific project
    return Promise.resolve([]);
  }

  @Post(PROJECT_COMMENTS_ROUTES.create(":projectId"))
  create(@Param("projectId") projectId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic for creating a comment for a specific project
    return Promise.resolve(undefined);
  }

  @Patch(PROJECT_COMMENTS_ROUTES.update(":projectCommentId"))
  update(@Param("projectCommentId") projectCommentId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic for updating a specific comment by ID
    return Promise.resolve(undefined);
  }

  @Delete(PROJECT_COMMENTS_ROUTES.delete(":projectCommentId"))
  delete(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    // TODO: Add service logic for deleting a specific comment by ID
    return Promise.resolve(undefined);
  }

  @Patch(PROJECT_COMMENTS_ROUTES.restore(":projectCommentId"))
  restore(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    // TODO: Add service logic for restoring a specific comment by ID
    return Promise.resolve(undefined);
  }
}
