import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  ProjectCreateRequestDTO,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/projects/projects.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/projects/projects.dto";
import { Repository } from "typeorm";

import { Project } from "../../models/entities/project.entity";

import { mapProjectToDTO, mapProjectToPreviewDTO } from "./projects.mappers";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async findAll(): Promise<ProjectPreviewDTO[]> {
    const projects: Project[] = await this.projectRepository.find({
      relations: ["user", "customer", "users_accountable"]
    });
    return projects.map(mapProjectToPreviewDTO);
  }

  async findOne(projectId: string): Promise<ProjectDTO> {
    const project: Project = await this.projectRepository.findOneOrFail({
      where: { project_id: projectId },
      relations: ["user", "customer", "users_accountable"]
    });
    return mapProjectToDTO(project);
  }

  async create(dto: ProjectCreateRequestDTO): Promise<ProjectDTO> {
    const project: Project = this.projectRepository.create({
      ...dto,
      users_accountable: dto.users_accountable.map(({ id }) => ({ user_id: id }))
    });
    const savedProject: Project = await this.projectRepository.save(project);
    return this.findOne(savedProject.project_id);
  }

  async update(projectId: string, dto: ProjectUpdateRequestDTO): Promise<ProjectDTO> {
    const project: Project = await this.projectRepository.findOneOrFail({ where: { project_id: projectId } });
    Object.assign(project, {
      ...dto,
      users_accountable: dto.users_accountable?.map(({ id }) => ({ user_id: id })) ?? project.users_accountable
    });
    const updatedProject: Project = await this.projectRepository.save(project);
    return this.findOne(updatedProject.project_id);
  }

  async delete(projectId: string): Promise<void> {
    await this.projectRepository.softDelete({ project_id: projectId });
  }

  async restore(projectId: string): Promise<void> {
    await this.projectRepository.restore({ project_id: projectId });
  }
}
