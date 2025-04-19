import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";
import { Repository } from "typeorm";

import { ProjectLog } from "../../models/entities/project-log.entity";

import { mapProjectLogToDTO } from "./project-log.mappers";

@Injectable()
export class ProjectLogService {
  constructor(
    @InjectRepository(ProjectLog)
    private readonly projectLogRepository: Repository<ProjectLog>
  ) {}

  async findAll(projectId: string): Promise<ProjectLogDTO[]> {
    const projectLogs: ProjectLog[] = await this.projectLogRepository.find({
      where: { project: { project_id: projectId } },
      relations: {
        user: true,
        project: {
          user_created: true,
          users_accountable: true,
          customer: {
            user_created: true
          }
        }
      }
    });
    return projectLogs.map(mapProjectLogToDTO);
  }
}
