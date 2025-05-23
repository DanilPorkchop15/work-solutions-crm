import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogDTO } from "@work-solutions-crm/libs/shared/logger/logger.dto";
import { Repository } from "typeorm";

import { CustomerLog } from "../../models/entities/customer-log.entity";
import { DocumentLog } from "../../models/entities/document-log.entity";
import { ProjectLog } from "../../models/entities/project-log.entity";
import { TaskLog } from "../../models/entities/task-log.entity";
import { UserLog } from "../../models/entities/user-log.entity";

import { mapLogEntityToLogDTO } from "./logger.mappers";
import { LogData, LogOptions, LogType } from "./logger.types";

type LogRepository = Repository<ProjectLog | DocumentLog | TaskLog | UserLog | CustomerLog>;

@Injectable()
export class LoggerService {
  private static instance: LoggerService;

  private readonly logger: Logger = new Logger(LoggerService.name, {
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
        if (!options.affected_user_id) throw new Error("User ID is required");
        logData.affected_user = { user_id: options.affected_user_id };
        break;
    }

    await logRepository.save(logData);
    this.logger.log(this.formatLogData(logData, type));
  }

  public async getLatest(): Promise<LogDTO[]> {
    const [documentLogs, taskLogs, projectLogs, customerLogs] = await Promise.all([
      this.documentLogRepository.find({ order: { created_at: "DESC" }, take: 25, relations: ["user"] }),
      this.taskLogRepository.find({ order: { created_at: "DESC" }, take: 25, relations: ["user"] }),
      this.projectLogRepository.find({ order: { created_at: "DESC" }, take: 25, relations: ["user"] }),
      this.customerLogRepository.find({ order: { created_at: "DESC" }, take: 25, relations: ["user"] })
    ]);
    return [
      ...documentLogs.map(mapLogEntityToLogDTO),
      ...taskLogs.map(mapLogEntityToLogDTO),
      ...projectLogs.map(mapLogEntityToLogDTO),
      ...customerLogs.map(mapLogEntityToLogDTO)
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  log(action: string, comment: string): void {
    return this.logger.log(this.formatLogData({ action, comment }));
  }

  private formatLogData(logData: LogData, type?: LogType): string {
    const { action, comment, user, document, task, project, customer, affected_user } = logData;

    const sections: string[] = [
      type ? `[${type}]` : "",
      action,
      comment ? `- ${comment}` : "",
      user ? `User: ${user.user_id}` : "",
      affected_user ? `Affected User: ${affected_user.user_id}` : "",
      document ? `Document: ${document.document_id}` : "",
      task ? `Task: ${task.task_id}` : "",
      project ? `Project: ${project.project_id}` : "",
      customer ? `Customer: ${customer.customer_id}` : ""
    ];

    const logHeader: string = sections.slice(0, 3).filter(Boolean).join(" ");
    const logDetails: string = sections
      .slice(3)
      .filter(Boolean)
      .map(section => `[${section.padEnd(30, " ")}]`)
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
