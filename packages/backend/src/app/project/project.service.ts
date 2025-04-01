import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ProjectBulkDeleteRequestDTO,
  ProjectBulkRestoreRequestDTO,
  ProjectCreateRequestDTO,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";
import { Repository } from "typeorm";

import { Project } from "../../models/entities/project.entity";
import { User } from "../../models/entities/user.entity";

import { mapCreateOrUpdateProjectDtoToProject, mapProjectToDTO, mapProjectToPreviewDTO } from "./project.mappers";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async findAll(): Promise<ProjectPreviewDTO[]> {
    const projects: Project[] = await this.projectRepository.find({
      relations: ["user_created", "customer", "users_accountable", "customer.user_created"],
      withDeleted: true
    });
    return projects.map(mapProjectToPreviewDTO);
  }

  async findOne(projectId: string): Promise<ProjectDTO> {
    const project: Project = await this.projectRepository.findOneOrFail({
      where: { project_id: projectId },
      relations: ["user_created", "customer", "users_accountable", "customer.user_created"],
      withDeleted: true
    });
    return mapProjectToDTO(project);
  }

  async create(dto: ProjectCreateRequestDTO, user: User): Promise<ProjectDTO> {
    const project: Project = await this.projectRepository.save({
      ...mapCreateOrUpdateProjectDtoToProject(dto),
      user_created: { user_id: user.user_id }
    });
    return this.findOne(project.project_id);
  }

  async update(projectId: string, dto: ProjectUpdateRequestDTO): Promise<ProjectDTO> {
    const project: Project = await this.projectRepository.findOneOrFail({ where: { project_id: projectId } });

    const updatedProject: Project = await this.projectRepository.save({
      ...project,
      ...mapCreateOrUpdateProjectDtoToProject(dto)
    });
    return this.findOne(updatedProject.project_id);
  }

  async delete(projectId: string): Promise<void> {
    await this.projectRepository.softDelete({ project_id: projectId });
  }

  async restore(projectId: string): Promise<void> {
    await this.projectRepository.restore({ project_id: projectId });
  }

  async bulkDelete(dto: ProjectBulkDeleteRequestDTO): Promise<void> {
    await this.projectRepository.softDelete(dto.project_ids);
  }

  async bulkRestore(dto: ProjectBulkRestoreRequestDTO): Promise<void> {
    await this.projectRepository.restore(dto.project_ids);
  }
}
