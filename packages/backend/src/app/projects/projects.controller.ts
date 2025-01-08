import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ProjectCreateRequestDTO,
  PROJECTS_ROUTES,
  ProjectsApi,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/projects/projects.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/projects/projects.dto";

import { ProjectsService } from "./projects.service";

@Controller()
export class ProjectsController implements ProjectsApi {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(PROJECTS_ROUTES.findAll())
  findAll(): Promise<ProjectPreviewDTO[]> {
    return this.projectsService.findAll();
  }

  @Get(PROJECTS_ROUTES.findOne(":projectId"))
  findOne(@Param("projectId") projectId: string): Promise<ProjectDTO> {
    return this.projectsService.findOne(projectId);
  }

  @Post(PROJECTS_ROUTES.create())
  create(@Body() dto: ProjectCreateRequestDTO): Promise<ProjectDTO> {
    return this.projectsService.create(dto);
  }

  @Patch(PROJECTS_ROUTES.update(":projectId"))
  update(@Param("projectId") projectId: string, @Body() dto: ProjectUpdateRequestDTO): Promise<ProjectDTO> {
    return this.projectsService.update(projectId, dto);
  }

  @Delete(PROJECTS_ROUTES.delete(":projectId"))
  delete(@Param("projectId") projectId: string): Promise<void> {
    return this.projectsService.delete(projectId);
  }

  @Patch(PROJECTS_ROUTES.restore(":projectId"))
  restore(@Param("projectId") projectId: string): Promise<void> {
    return this.projectsService.restore(projectId);
  }
}
