import { Controller, Get, Param } from "@nestjs/common";
import { PROJECT_LOGS_ROUTES, ProjectLogsApi } from "@work-solutions-crm/libs/shared/project-logs/project-logs.api";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-logs/project-logs.dto";

@Controller()
export class ProjectLogsController implements ProjectLogsApi {
  @Get(PROJECT_LOGS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectLogDTO[]> {
    // TODO
    return Promise.resolve([]);
  }
}
