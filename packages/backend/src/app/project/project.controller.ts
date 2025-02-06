import { AuthGuard } from "@backend/app/auth/auth.guard";
import { LogType } from "@backend/app/logger/logger.types";
import {
  ProjectBulkDeleteValidationDTO,
  ProjectBulkRestoreValidationDTO,
  ProjectCreateValidationDTO,
  ProjectPreviewResponseDTO,
  ProjectResponseDTO,
  ProjectUpdateValidationDTO
} from "@backend/app/project/project.dto";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { Logger } from "@backend/decorators/logger.decorator";
import { User } from "@backend/models/entities/user.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectApi, PROJECTS_ROUTES } from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";

import { LoggerService } from "../logger/logger.service";

import { ProjectService } from "./project.service";

@ApiTags("Projects")
@ApiBearerAuth()
@Controller()
export class ProjectController implements ProjectApi {
  constructor(
    private readonly projectsService: ProjectService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard)
  @Get(PROJECTS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all projects" })
  @ApiResponse({ status: 200, type: [ProjectPreviewResponseDTO] })
  @Logger("findAll", "Projects")
  findAll(): Promise<ProjectPreviewDTO[]> {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(PROJECTS_ROUTES.findOne(":projectId"))
  @ApiOperation({ summary: "Retrieve a specific project by ID" })
  @ApiResponse({ status: 200, type: ProjectPreviewResponseDTO })
  @Logger("findOne", "Project")
  findOne(@Param("projectId") projectId: string): Promise<ProjectDTO> {
    return this.projectsService.findOne(projectId);
  }

  @UseGuards(AuthGuard)
  @Post(PROJECTS_ROUTES.create())
  @ApiOperation({ summary: "Create a new project" })
  @ApiResponse({ status: 201, type: ProjectResponseDTO })
  async create(@Body() dto: ProjectCreateValidationDTO, @CurrentUser() user: User): Promise<ProjectDTO> {
    const projectDto: ProjectDTO = await this.projectsService.create(dto);
    await this.loggerService.logByType(LogType.PROJECT, "created", "project", {
      project_id: projectDto.id,
      user_id: user.user_id
    });
    return projectDto;
  }

  @UseGuards(AuthGuard)
  @Patch(PROJECTS_ROUTES.update(":projectId"))
  @ApiOperation({ summary: "Update an existing project" })
  @ApiResponse({ status: 200, type: ProjectResponseDTO })
  async update(
    @Param("projectId") projectId: string,
    @Body() dto: ProjectUpdateValidationDTO,
    @CurrentUser() user: User
  ): Promise<ProjectDTO> {
    const projectDto: ProjectDTO = await this.projectsService.update(projectId, dto);
    await this.loggerService.logByType(LogType.PROJECT, "updated", "project", {
      project_id: projectId,
      user_id: user.user_id
    });
    return projectDto;
  }

  @UseGuards(AuthGuard)
  @Delete(PROJECTS_ROUTES.delete(":projectId"))
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({ status: 204 })
  async delete(@Param("projectId") projectId: string, @CurrentUser() user: User): Promise<void> {
    await this.projectsService.delete(projectId);
    await this.loggerService.logByType(LogType.PROJECT, "deleted", "project", {
      project_id: projectId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard)
  @Patch(PROJECTS_ROUTES.restore(":projectId"))
  @ApiOperation({ summary: "Restore a deleted project" })
  @ApiResponse({ status: 204 })
  async restore(@Param("projectId") projectId: string, @CurrentUser() user: User): Promise<void> {
    await this.projectsService.restore(projectId);
    await this.loggerService.logByType(LogType.PROJECT, "restored", "project", {
      project_id: projectId,
      user_id: user.user_id
    });
  }

  @Delete(PROJECTS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Delete multiple projects" })
  @ApiBody({ type: ProjectBulkDeleteValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async bulkDelete(@Body() dto: ProjectBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.projectsService.bulkDelete(dto);
    for (const projectId of dto.project_ids) {
      await this.loggerService.logByType(LogType.PROJECT, "bulk deleted", "projects", {
        project_id: projectId,
        user_id: user.user_id
      });
    }
  }

  @Patch(PROJECTS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Restore multiple deleted projects" })
  @ApiBody({ type: ProjectBulkRestoreValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async bulkRestore(@Body() dto: ProjectBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.projectsService.bulkRestore(dto);
    for (const projectId of dto.project_ids) {
      await this.loggerService.logByType(LogType.PROJECT, "bulk restored", "projects", {
        project_id: projectId,
        user_id: user.user_id
      });
    }
  }
}
