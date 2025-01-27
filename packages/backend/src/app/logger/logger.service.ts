import { LOGGER_SERVICE_NAME } from "@backend/app/logger/logger.constraints";
import { LogData, LogOptions, LogType } from "@backend/app/logger/logger.types";
import { DocumentLog } from "@backend/models/entities/document-log.entity";
import { ProjectLog } from "@backend/models/entities/project-log.entity";
import { TaskLog } from "@backend/models/entities/task-log.entity";
import { UserLog } from "@backend/models/entities/user-log.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class LoggerService {
  private static instance: LoggerService;

  private readonly logger: Logger = new Logger(LOGGER_SERVICE_NAME, {
    timestamp: true
  });

  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
    @InjectRepository(DocumentLog)
    private readonly documentLogRepository: Repository<DocumentLog>,
    @InjectRepository(TaskLog)
    private readonly taskLogRepository: Repository<TaskLog>,
    @InjectRepository(ProjectLog)
    private readonly projectLogRepository: Repository<ProjectLog>
  ) {
    if (!LoggerService.instance) {
      LoggerService.instance = this;
    }
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      throw new Error("LoggerService is not initialized.");
    }
    return LoggerService.instance;
  }

  async logByType(type: LogType, action: string, comment?: string, options?: LogOptions): Promise<void> {
    const logRepositoryMap: Record<LogType, Repository<ProjectLog | DocumentLog | TaskLog | UserLog>> = {
      [LogType.USER]: this.userLogRepository,
      [LogType.DOCUMENT]: this.documentLogRepository,
      [LogType.TASK]: this.taskLogRepository,
      [LogType.PROJECT]: this.projectLogRepository
    };

    const logRepository: Repository<ProjectLog | DocumentLog | TaskLog | UserLog> = logRepositoryMap[type];

    if (!logRepository) {
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
    this.logger.log(this.formatLogData(logData, type));
  }

  log(action: string, comment?: string): void {
    return this.logger.log(this.formatLogData({ action, comment }));
  }

  private formatLogData(logData: LogData, type?: LogType): string {
    const { action, comment, user, document, task, project } = logData;

    const sections: string[] = [
      type ? `[${type}]` : "",
      action,
      comment ? `- ${comment}` : "",
      user ? `User: ${user.user_id}` : "",
      document ? `Document: ${document.document_id}` : "",
      task ? `Task: ${task.task_id}` : "",
      project ? `Project: ${project.project_id}` : ""
    ];

    const logHeader: string = sections.slice(0, 3).filter(Boolean).join(" ");
    const logDetails: string = sections
      .slice(3)
      .filter(Boolean)
      .map(section => `| ${section.padEnd(30, " ")}|`)
      .join("\n");

    return `${logHeader}\n${logDetails}`;
  }
}
