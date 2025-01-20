import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comment/task-comment.dto";
import { Repository } from "typeorm";

import { TaskComment } from "../../models/entities/task-comment.entity";

import { mapTaskCommentToDTO } from "./task-comment.mappers";

@Injectable()
export class TaskCommentService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly taskCommentRepository: Repository<TaskComment>
  ) {}

  async findAll(taskId: string): Promise<TaskCommentDTO[]> {
    const comments: TaskComment[] = await this.taskCommentRepository.find({
      where: { task: { task_id: taskId } },
      relations: ["user", "task"],
      order: { created_at: "ASC" }
    });
    return comments.map(mapTaskCommentToDTO);
  }

  async create(taskId: string, userId: string, text: string): Promise<void> {
    const comment: TaskComment = this.taskCommentRepository.create({
      task: { task_id: taskId },
      user: { user_id: userId },
      text
    });
    await this.taskCommentRepository.save(comment);
  }

  async update(taskCommentId: string, text: string): Promise<void> {
    await this.taskCommentRepository.update(taskCommentId, { text });
  }

  async delete(taskCommentId: string): Promise<void> {
    await this.taskCommentRepository.softDelete(taskCommentId);
  }

  async restore(taskCommentId: string): Promise<void> {
    await this.taskCommentRepository.restore(taskCommentId);
  }
}
