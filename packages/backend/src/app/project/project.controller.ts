import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  ProjectCreateValidationDTO,
  ProjectPreviewResponseDTO,
  ProjectResponseDTO,
  ProjectUpdateValidationDTO
} from "@backend/app/project/project.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectApi, PROJECTS_ROUTES } from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";

import { ProjectService } from "./project.service";

@ApiTags("Projects")
@ApiBearerAuth()
@Controller()
export class ProjectController implements ProjectApi {
  constructor(private readonly projectsService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Get(PROJECTS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all projects" })
  @ApiResponse({
    status: 200,
    description: "List of projects retrieved successfully",
    type: [ProjectPreviewResponseDTO]
  })
  findAll(): Promise<ProjectPreviewDTO[]> {
    return this.projectsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(PROJECTS_ROUTES.findOne(":projectId"))
  @ApiOperation({ summary: "Retrieve a specific project by ID" })
  @ApiResponse({ status: 200, description: "Project retrieved successfully", type: ProjectPreviewResponseDTO })
  findOne(@Param("projectId") projectId: string): Promise<ProjectDTO> {
    return this.projectsService.findOne(projectId);
  }

  @UseGuards(AuthGuard)
  @Post(PROJECTS_ROUTES.create())
  @ApiOperation({ summary: "Create a new project" })
  @ApiResponse({ status: 201, description: "Project created successfully", type: ProjectResponseDTO })
  create(@Body() dto: ProjectCreateValidationDTO): Promise<ProjectDTO> {
    return this.projectsService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(PROJECTS_ROUTES.update(":projectId"))
  @ApiOperation({ summary: "Update an existing project" })
  @ApiResponse({ status: 200, description: "Project updated successfully", type: ProjectResponseDTO })
  update(@Param("projectId") projectId: string, @Body() dto: ProjectUpdateValidationDTO): Promise<ProjectDTO> {
    return this.projectsService.update(projectId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(PROJECTS_ROUTES.delete(":projectId"))
  @ApiOperation({ summary: "Delete a project" })
  @ApiResponse({ status: 204, description: "Project deleted successfully" })
  delete(@Param("projectId") projectId: string): Promise<void> {
    return this.projectsService.delete(projectId);
  }

  @UseGuards(AuthGuard)
  @Patch(PROJECTS_ROUTES.restore(":projectId"))
  @ApiOperation({ summary: "Restore a deleted project" })
  @ApiResponse({ status: 204, description: "Project restored successfully" })
  restore(@Param("projectId") projectId: string): Promise<void> {
    return this.projectsService.restore(projectId);
  }
}
