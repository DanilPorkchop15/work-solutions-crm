import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";

import { Task } from "../../models/entities/task.entity";
import { mapProjectToPreviewDTO } from "../project/project.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapTaskToDTO(task: Task): TaskDTO {
  return {
    id: task.task_id,
    name: task.name,
    description: task.description,
    status: task.status,
    start_date: typeormNullableDateToIsoString(task.start_date),
    end_date: typeormNullableDateToIsoString(task.end_date),
    time_spent: task.time_spent,
    estimated_time: task.estimated_time,
    user_created: mapUserToPreviewDTO(task.user_created),
    project: mapProjectToPreviewDTO(task.project),
    users_accountable: task.users_accountable.map(mapUserToPreviewDTO),
    created_at: typeormDateToIsoString(task.created_at),
    updated_at: typeormDateToIsoString(task.updated_at),
    deleted_at: typeormNullableDateToIsoString(task.deleted_at)
  };
}

export function mapTaskToPreviewDTO(task: Task): TaskPreviewDTO {
  return {
    id: task.task_id,
    name: task.name,
    status: task.status,
    project: mapProjectToPreviewDTO(task.project),
    user_created: mapUserToPreviewDTO(task.user_created),
    users_accountable: task.users_accountable.map(mapUserToPreviewDTO),
    deleted_at: typeormNullableDateToIsoString(task.deleted_at)
  };
}
