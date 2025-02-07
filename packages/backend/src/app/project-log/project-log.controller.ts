import { AuthGuard } from "@backend/app/auth/auth.guard";
import { CaslGuard } from "@backend/app/permission/casl.guard";
import { ProjectLogResponseDTO } from "@backend/app/project-log/project-log.dto";
import { CheckPolicies } from "@backend/decorators/check-policies.decorator";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { PROJECT_LOGS_ROUTES, ProjectLogApi } from "@work-solutions-crm/libs/shared/project-log/project-log.api";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";

import { ProjectLogService } from "./project-log.service";

@Controller()
@ApiTags("Project Logs")
@ApiBearerAuth()
export class ProjectLogController implements ProjectLogApi {
  constructor(private readonly projectLogsService: ProjectLogService) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.PROJECTS))
  @ApiOperation({ summary: "Get all logs for a project" })
  @ApiResponse({ status: 200, type: [ProjectLogResponseDTO] })
  @Get(PROJECT_LOGS_ROUTES.findAll(":projectId"))
  findAll(@Param("projectId") projectId: string): Promise<ProjectLogDTO[]> {
    return this.projectLogsService.findAll(projectId);
  }
}
