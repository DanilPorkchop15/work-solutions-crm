import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import {
  PROJECT_COMMENTS_ROUTES,
  ProjectCommentApi
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  ProjectCommentCreateValidationDTO,
  ProjectCommentResponseDTO,
  ProjectCommentUpdateValidationDTO
} from "./project-comment.dto";
import { ProjectCommentService } from "./project-comment.service";

@ApiTags("Project Comments")
@Controller()
export class ProjectCommentController implements ProjectCommentApi {
  constructor(
    private readonly projectCommentsService: ProjectCommentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Get all comments for a project" })
  @ApiResponse({ status: 200, description: "OK", type: [ProjectCommentResponseDTO] })
  @Get(PROJECT_COMMENTS_ROUTES.findAll(":projectId"))
  @Logger("findAll", "project comments")
  findAll(@Param("projectId") projectId: string): Promise<ProjectCommentDTO[]> {
    return this.projectCommentsService.findAll(projectId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Create a new comment for a project" })
  @ApiResponse({ status: 201, description: "Created" })
  @Post(PROJECT_COMMENTS_ROUTES.create(":projectId"))
  async create(
    @Param("projectId") projectId: string,
    @Body() { text }: ProjectCommentCreateValidationDTO,
    @CurrentUser() user: User
  ): Promise<void> {
    await this.projectCommentsService.create(projectId, user.user_id, text);
    await this.loggerService.logByType(
      LogType.PROJECT,
      "прокомментировал",
      `Пользователь ${user.user_id} добавил комментарий к проекту ${projectId}`,
      { project_id: projectId, user_id: user.user_id }
    );
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Update a project comment" })
  @ApiResponse({ status: 200, description: "Updated" })
  @Patch(PROJECT_COMMENTS_ROUTES.update(":projectCommentId"))
  @Logger("update", "project comment")
  update(
    @Param("projectCommentId") projectCommentId: string,
    @Body() { text }: ProjectCommentUpdateValidationDTO
  ): Promise<void> {
    return this.projectCommentsService.update(projectCommentId, text);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Delete a project comment" })
  @ApiResponse({ status: 200, description: "Deleted" })
  @Delete(PROJECT_COMMENTS_ROUTES.delete(":projectCommentId"))
  @Logger("delete", "project comment")
  delete(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.delete(projectCommentId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Restore a deleted project comment" })
  @ApiResponse({ status: 200, description: "Restored" })
  @Patch(PROJECT_COMMENTS_ROUTES.restore(":projectCommentId"))
  @Logger("restore", "project comment")
  restore(@Param("projectCommentId") projectCommentId: string): Promise<void> {
    return this.projectCommentsService.restore(projectCommentId);
  }
}
