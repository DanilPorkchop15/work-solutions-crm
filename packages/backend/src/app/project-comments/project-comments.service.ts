import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comments/project-comments.dto";
import { Repository } from "typeorm";

import { ProjectComment } from "../../models/entities/project-comment.entity";

import { mapProjectCommentToDTO } from "./project-comments.mappers";

@Injectable()
export class ProjectCommentsService {
  constructor(
    @InjectRepository(ProjectComment)
    private readonly projectCommentRepository: Repository<ProjectComment>
  ) {}

  async findAll(projectId: string): Promise<ProjectCommentDTO[]> {
    const comments: ProjectComment[] = await this.projectCommentRepository.find({
      where: { project: { project_id: projectId } },
      relations: ["user", "project"],
      order: { created_at: "ASC" }
    });
    return comments.map(mapProjectCommentToDTO);
  }

  async create(projectId: string, userId: string, text: string): Promise<void> {
    const comment: ProjectComment = this.projectCommentRepository.create({
      project: { project_id: projectId },
      user: { user_id: userId },
      text
    });
    await this.projectCommentRepository.save(comment);
  }

  async update(projectCommentId: string, text: string): Promise<void> {
    await this.projectCommentRepository.update(projectCommentId, { text });
  }

  async delete(projectCommentId: string): Promise<void> {
    await this.projectCommentRepository.softDelete(projectCommentId);
  }

  async restore(projectCommentId: string): Promise<void> {
    await this.projectCommentRepository.restore(projectCommentId);
  }
}
