import { DocumentLog } from "@backend/models/entities/document-log.entity";
import { ProjectLog } from "@backend/models/entities/project-log.entity";
import { TaskLog } from "@backend/models/entities/task-log.entity";
import { UserLog } from "@backend/models/entities/user-log.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export enum LogType {
  USER = "user",
  DOCUMENT = "document",
  TASK = "task",
  PROJECT = "project",
  OTHER = "other"
}

export interface LogOptions {
  user_id: string;
  document_id?: string;
  task_id?: string;
  project_id?: string;
}

export interface LogData {
  action: string;
  comment?: string;
  user?: { user_id: string };
  document?: { document_id: string };
  task?: { task_id: string };
  project?: { project_id: string };
}

@Injectable()
export class LoggerService {
  private readonly logger: Logger = new Logger("LoggerService");

  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
    @InjectRepository(DocumentLog)
    private readonly documentLogRepository: Repository<DocumentLog>,
    @InjectRepository(TaskLog)
    private readonly taskLogRepository: Repository<TaskLog>,
    @InjectRepository(ProjectLog)
    private readonly projectLogRepository: Repository<ProjectLog>
  ) {}

  async log(type: LogType, action: string, comment?: string, options?: LogOptions): Promise<void> {
    const logRepositoryMap: Record<
      Exclude<LogType, LogType.OTHER>,
      Repository<ProjectLog | DocumentLog | TaskLog | UserLog>
    > = {
      [LogType.USER]: this.userLogRepository,
      [LogType.DOCUMENT]: this.documentLogRepository,
      [LogType.TASK]: this.taskLogRepository,
      [LogType.PROJECT]: this.projectLogRepository
    };

    const logRepository: Repository<ProjectLog | DocumentLog | TaskLog | UserLog> = logRepositoryMap[type] as
      | Repository<ProjectLog>
      | Repository<DocumentLog>
      | Repository<TaskLog>
      | Repository<UserLog>;
    if (!logRepository) {
      if (type === LogType.OTHER) {
        this.logger.log({ action, comment, options });
        return;
      }
      this.logger.warn(`Unknown log type: ${type}`);
      return;
    }

    const logData: LogData = {
      action,
      comment,
      user: options && { user_id: options.user_id }
    };

    if (options?.document_id) logData.document = { document_id: options.document_id };
    if (options?.task_id) logData.task = { task_id: options.task_id };
    if (options?.project_id) logData.project = { project_id: options.project_id };

    await logRepository.save(logData);
    this.logger.log({ action, comment, options });
  }
}
