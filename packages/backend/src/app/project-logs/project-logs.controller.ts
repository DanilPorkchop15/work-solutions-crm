import { Controller, Get, Param } from "@nestjs/common";
import { PROJECT_LOGS_ROUTES, ProjectLogsApi } from "@work-solutions-crm/libs/shared/project-logs/project-logs.api";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-logs/project-logs.dto";

import { ProjectLogsService } from "./project-logs.service";

@Controller()
export class ProjectLogsController implements ProjectLogsApi {
  constructor(private readonly projectLogsService: ProjectLogsService) {}

  @Get(PROJECT_LOGS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectLogDTO[]> {
    return this.projectLogsService.findAll(projectId);
  }
}
