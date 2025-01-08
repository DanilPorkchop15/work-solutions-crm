import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-logs/project-logs.dto";
import { Repository } from "typeorm";

import { ProjectLog } from "../../models/entities/project-log.entity";

import { mapProjectLogToDTO } from "./project-logs.mappers";

@Injectable()
export class ProjectLogsService {
  constructor(
    @InjectRepository(ProjectLog)
    private readonly projectLogRepository: Repository<ProjectLog>
  ) {}

  async findAll(projectId: string): Promise<ProjectLogDTO[]> {
    const projectLogs: ProjectLog[] = await this.projectLogRepository.find({
      where: { project: { project_id: projectId } },
      relations: ["user", "project"]
    });
    return projectLogs.map(mapProjectLogToDTO);
  }
}
