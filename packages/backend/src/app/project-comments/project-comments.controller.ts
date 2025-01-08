import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  PROJECT_COMMENTS_ROUTES,
  ProjectCommentsApi
} from "@work-solutions-crm/libs/shared/project-comments/project-comments.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comments/project-comments.dto";

import { ProjectCommentsService } from "./project-comments.service";

@Controller()
export class ProjectCommentsController implements ProjectCommentsApi {
  constructor(private readonly projectCommentsService: ProjectCommentsService) {}

  @Get(PROJECT_COMMENTS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectCommentDTO[]> {
    return this.projectCommentsService.findAll(projectId);
  }

  @Post(PROJECT_COMMENTS_ROUTES.create(":projectId"))
  create(@Param("projectId") projectId: string, @Body("text") text: string): Promise<void> {
    // TODO get user id from auth
    return this.projectCommentsService.create(projectId, "userId", text);
  }

  @Patch(PROJECT_COMMENTS_ROUTES.update(":projectCommentId"))
  update(@Param("projectCommentId") projectCommentId: string, @Body("text") text: string): Promise<void> {
    return this.projectCommentsService.update(projectCommentId, text);
  }

  @Delete(PROJECT_COMMENTS_ROUTES.delete(":projectCommentId"))
  delete(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.delete(projectCommentId);
  }

  @Patch(PROJECT_COMMENTS_ROUTES.restore(":projectCommentId"))
  restore(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.restore(projectCommentId);
  }
}
