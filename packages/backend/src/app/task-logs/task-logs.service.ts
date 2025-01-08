import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-logs/task-logs.dto";
import { Repository } from "typeorm";

import { TaskLog } from "../../models/entities/task-log.entity";

import { mapTaskLogToDTO } from "./task-logs.mappers";

@Injectable()
export class TaskLogsService {
  constructor(
    @InjectRepository(TaskLog)
    private readonly taskLogRepository: Repository<TaskLog>
  ) {}

  async findAll(taskId: string): Promise<TaskLogDTO[]> {
    const taskLogs: TaskLog[] = await this.taskLogRepository.find({
      where: { task: { task_id: taskId } },
      relations: ["user", "task"],
      order: { created_at: "ASC" }
    });
    return taskLogs.map(mapTaskLogToDTO);
  }

  async create(taskId: string, userId: string, action: string, comment?: string): Promise<void> {
    const taskLog: TaskLog = this.taskLogRepository.create({
      task: { task_id: taskId },
      user: { user_id: userId },
      action,
      comment
    });
    await this.taskLogRepository.save(taskLog);
  }

  async update(taskLogId: string, action: string, comment?: string): Promise<void> {
    await this.taskLogRepository.update(taskLogId, { action, comment });
  }

  async delete(taskLogId: string): Promise<void> {
    await this.taskLogRepository.softDelete(taskLogId);
  }

  async restore(taskLogId: string): Promise<void> {
    await this.taskLogRepository.restore(taskLogId);
  }
}
