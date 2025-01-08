import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  ProjectCreateRequestDTO,
  PROJECTS_ROUTES,
  ProjectsApi,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/projects/projects.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/projects/projects.dto";

@Controller()
export class ProjectsController implements ProjectsApi {
  @Get(PROJECTS_ROUTES.findAll())
  findAll(): Promise<ProjectPreviewDTO[]> {
    // TODO: Add service logic for fetching all projects
    return Promise.resolve([]);
  }

  @Get(PROJECTS_ROUTES.findOne(":projectId"))
  findOne(@Param("projectId") projectId: string): Promise<ProjectDTO> {
    // TODO: Add service logic for fetching a single project by ID
    return Promise.resolve(undefined);
  }

  @Post(PROJECTS_ROUTES.create())
  create(@Body() dto: ProjectCreateRequestDTO): Promise<ProjectDTO> {
    // TODO: Add service logic for creating a new project
    return Promise.resolve(undefined);
  }

  @Patch(PROJECTS_ROUTES.update(":projectId"))
  update(@Param("projectId") projectId: string, @Body() dto: ProjectUpdateRequestDTO): Promise<ProjectDTO> {
    // TODO: Add service logic for updating a project by ID
    return Promise.resolve(undefined);
  }

  @Delete(PROJECTS_ROUTES.delete(":projectId"))
  delete(@Param("projectId") projectId: string): Promise<void> {
    // TODO: Add service logic for deleting a project by ID
    return Promise.resolve(undefined);
  }

  @Patch(PROJECTS_ROUTES.restore(":projectId"))
  restore(@Param("projectId") projectId: string): Promise<void> {
    // TODO: Add service logic for restoring a project by ID
    return Promise.resolve(undefined);
  }
}
