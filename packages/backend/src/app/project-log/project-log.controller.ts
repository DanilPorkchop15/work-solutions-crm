import { Controller, Get, Param } from "@nestjs/common";
import { PROJECT_LOGS_ROUTES, ProjectLogApi } from "@work-solutions-crm/libs/shared/project-log/project-log.api";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";

import { ProjectLogService } from "./project-log.service";

@Controller()
export class ProjectLogController implements ProjectLogApi {
  constructor(private readonly projectLogsService: ProjectLogService) {}

  @Get(PROJECT_LOGS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectLogDTO[]> {
    return this.projectLogsService.findAll(projectId);
  }
}
