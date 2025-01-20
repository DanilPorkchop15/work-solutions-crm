import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  PROJECT_COMMENTS_ROUTES,
  ProjectCommentApi
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";

import { ProjectCommentService } from "./project-comment.service";

@Controller()
export class ProjectCommentController implements ProjectCommentApi {
  constructor(private readonly projectCommentsService: ProjectCommentService) {}

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
