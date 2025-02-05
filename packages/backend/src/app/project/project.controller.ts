import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ProjectApi,
  ProjectBulkDeleteRequestDTO,
  ProjectBulkRestoreRequestDTO,
  ProjectCreateRequestDTO,
  PROJECTS_ROUTES,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";

import { ProjectService } from "./project.service";

@Controller()
export class ProjectController implements ProjectApi {
  constructor(private readonly projectsService: ProjectService) {}

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

  @Delete(PROJECTS_ROUTES.bulkDelete())
  bulkDelete(@Body() dto: ProjectBulkDeleteRequestDTO): Promise<void> {
    return this.projectsService.bulkDelete(dto);
  }

  @Patch(PROJECTS_ROUTES.bulkRestore())
  bulkRestore(@Body() dto: ProjectBulkRestoreRequestDTO): Promise<void> {
    return this.projectsService.bulkRestore(dto);
  }
}
