import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-log/task-log.dto";

import { TaskLog } from "../../models/entities/task-log.entity";
import { mapTaskToPreviewDTO } from "../task/task.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapTaskLogToDTO(taskLog: TaskLog): TaskLogDTO {
  return {
    id: taskLog.task_log_id,
    action: taskLog.action,
    comment: taskLog.comment ?? "",
    user: mapUserToPreviewDTO(taskLog.user),
    task: mapTaskToPreviewDTO(taskLog.task),
    created_at: typeormDateToIsoString(taskLog.created_at),
    deleted_at: typeormNullableDateToIsoString(taskLog.deleted_at)
  };
}
