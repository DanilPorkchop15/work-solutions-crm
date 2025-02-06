import { LOGGER_SERVICE_NAME } from "@backend/app/logger/logger.constraints";
import { LogData, LogOptions, LogType } from "@backend/app/logger/logger.types";
import { CustomerLog } from "@backend/models/entities/customer-log.entity";
import { DocumentLog } from "@backend/models/entities/document-log.entity";
import { ProjectLog } from "@backend/models/entities/project-log.entity";
import { TaskLog } from "@backend/models/entities/task-log.entity";
import { UserLog } from "@backend/models/entities/user-log.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

type LogRepository = Repository<ProjectLog | DocumentLog | TaskLog | UserLog | CustomerLog>;

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
    private readonly projectLogRepository: Repository<ProjectLog>,
    @InjectRepository(CustomerLog)
    private readonly customerLogRepository: Repository<CustomerLog>
  ) {
    if (!LoggerService.instance) {
      LoggerService.instance = this;
    }
  }

  async logByType(type: LogType, action: string, comment: string, options: LogOptions): Promise<void> {
    const logRepositoryMap: Record<LogType, LogRepository> = {
      [LogType.USER]: this.userLogRepository,
      [LogType.DOCUMENT]: this.documentLogRepository,
      [LogType.TASK]: this.taskLogRepository,
      [LogType.PROJECT]: this.projectLogRepository,
      [LogType.CUSTOMER]: this.customerLogRepository
    };

    const logRepository: LogRepository = logRepositoryMap[type];

    if (!logRepository) {
      this.logger.warn(`Unknown log type: ${type}`);
      return;
    }

    const logData: LogData = {
      action,
      comment,
      user: options && { user_id: options.user_id }
    };

    switch (type) {
      case LogType.DOCUMENT:
        if (!options.document_id) throw new Error("Document ID is required");
        logData.document = { document_id: options.document_id };
        break;
      case LogType.TASK:
        if (!options.task_id) throw new Error("Task ID is required");
        logData.task = { task_id: options.task_id };
        break;
      case LogType.PROJECT:
        if (!options.project_id) throw new Error("Project ID is required");
        logData.project = { project_id: options.project_id };
        break;
      case LogType.CUSTOMER:
        if (!options.customer_id) throw new Error("Customer ID is required");
        logData.customer = { customer_id: options.customer_id };
        break;
      case LogType.USER:
        if (!options.user_id) throw new Error("User ID is required");
        break;
    }

    await logRepository.save(logData);
    this.logger.log(this.formatLogData(logData, type));
  }

  log(action: string, comment: string): void {
    return this.logger.log(this.formatLogData({ action, comment }));
  }

  private formatLogData(logData: LogData, type?: LogType): string {
    const { action, comment, user, document, task, project, customer } = logData;

    const sections: string[] = [
      type ? `[${type}]` : "",
      action,
      comment ? `- ${comment}` : "",
      user ? `User: ${user.user_id}` : "",
      document ? `Document: ${document.document_id}` : "",
      task ? `Task: ${task.task_id}` : "",
      project ? `Project: ${project.project_id}` : "",
      customer ? `Customer: ${customer.customer_id}` : ""
    ];

    const logHeader: string = sections.slice(0, 3).filter(Boolean).join(" ");
    const logDetails: string = sections
      .slice(3)
      .filter(Boolean)
      .map(section => `| ${section.padEnd(30, " ")}|`)
      .join("\n");

    return `${logHeader}\n${logDetails}`;
  }

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      throw new Error("LoggerService is not initialized.");
    }
    return LoggerService.instance;
  }
}
