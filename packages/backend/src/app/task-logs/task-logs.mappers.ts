import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-logs/task-logs.dto";

import { TaskLog } from "../../models/entities/task-log.entity";
import { mapTaskToPreviewDTO } from "../tasks/tasks.mappers";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapTaskLogToDTO(taskLog: TaskLog): TaskLogDTO {
  return {
    id: taskLog.task_log_id,
    action: taskLog.action,
    comment: taskLog.comment ?? "",
    user: mapUserToPreviewDTO(taskLog.user),
    task: mapTaskToPreviewDTO(taskLog.task),
    created_at: taskLog.created_at
  };
}
