import { LogDTO } from "@work-solutions-crm/libs/shared/logger/logger.dto";
import { v4 } from "uuid";

import { CustomerLog } from "../../models/entities/customer-log.entity";
import { DocumentLog } from "../../models/entities/document-log.entity";
import { ProjectLog } from "../../models/entities/project-log.entity";
import { TaskLog } from "../../models/entities/task-log.entity";
import { UserLog } from "../../models/entities/user-log.entity";

type LogEntity = UserLog | CustomerLog | DocumentLog | ProjectLog | TaskLog;

const ENTITY_TYPE_MAP: Record<string, string> = {
  UserLog: "user",
  CustomerLog: "customer",
  DocumentLog: "document",
  ProjectLog: "project",
  TaskLog: "task"
};

export function mapLogEntityToLogDTO(logEntity: LogEntity): LogDTO {
  const entityType: string = ENTITY_TYPE_MAP[logEntity.constructor.name];
  if (!entityType) {
    throw {
      message: "Unknown log entity",
      statusCode: 400
    };
  }

  return {
    id: v4(),
    type: entityType,
    action: logEntity.action,
    comment: logEntity.comment ?? "",
    user: {
      id: logEntity.user.user_id,
      first_name: logEntity.user.first_name,
      last_name: logEntity.user.last_name,
      email: logEntity.user.email
    },
    created_at: new Date(logEntity.created_at).toISOString(),
    deleted_at: logEntity.deleted_at ? new Date(logEntity.deleted_at).toISOString() : undefined
  };
}
