import { AuthGuard } from "@backend/app/auth/auth.guard";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PROJECT_LOGS_ROUTES, ProjectLogApi } from "@work-solutions-crm/libs/shared/project-log/project-log.api";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";

import { ProjectLogService } from "./project-log.service";

@Controller()
@ApiTags("Project Logs")
@ApiBearerAuth()
export class ProjectLogController implements ProjectLogApi {
  constructor(private readonly projectLogsService: ProjectLogService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all logs for a project" })
  @Get(PROJECT_LOGS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectLogDTO[]> {
    return this.projectLogsService.findAll(projectId);
  }
}
