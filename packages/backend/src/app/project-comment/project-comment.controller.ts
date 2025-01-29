import {
  ProjectCommentCreateValidationDTO,
  ProjectCommentUpdateValidationDTO
} from "@backend/app/project-comment/project-comment.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  PROJECT_COMMENTS_ROUTES,
  ProjectCommentApi
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";

import { ProjectCommentService } from "./project-comment.service";

@ApiTags("Project Comments")
@Controller()
export class ProjectCommentController implements ProjectCommentApi {
  constructor(private readonly projectCommentsService: ProjectCommentService) {}

  @ApiOperation({ summary: "Get all comments for a project" })
  // @ApiResponse({ status: 200, description: "OK", type: [ProjectCommentDTO] })
  @Get(PROJECT_COMMENTS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectCommentDTO[]> {
    return this.projectCommentsService.findAll(projectId);
  }

  @ApiOperation({ summary: "Create a new comment for a project" })
  @ApiResponse({ status: 201, description: "Created" })
  @Post(PROJECT_COMMENTS_ROUTES.create(":projectId"))
  create(@Param("projectId") projectId: string, @Body() { text }: ProjectCommentCreateValidationDTO): Promise<void> {
    // TODO get user id from auth
    return this.projectCommentsService.create(projectId, "userId", text);
  }

  @ApiOperation({ summary: "Update a project comment" })
  @ApiResponse({ status: 200, description: "Updated" })
  @Patch(PROJECT_COMMENTS_ROUTES.update(":projectCommentId"))
  update(
    @Param("projectCommentId") projectCommentId: string,
    @Body() { text }: ProjectCommentUpdateValidationDTO
  ): Promise<void> {
    return this.projectCommentsService.update(projectCommentId, text);
  }

  @ApiOperation({ summary: "Delete a project comment" })
  @ApiResponse({ status: 200, description: "Deleted" })
  @Delete(PROJECT_COMMENTS_ROUTES.delete(":projectCommentId"))
  delete(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.delete(projectCommentId);
  }

  @ApiOperation({ summary: "Restore a deleted project comment" })
  @ApiResponse({ status: 200, description: "Restored" })
  @Patch(PROJECT_COMMENTS_ROUTES.restore(":projectCommentId"))
  restore(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.restore(projectCommentId);
  }
}
