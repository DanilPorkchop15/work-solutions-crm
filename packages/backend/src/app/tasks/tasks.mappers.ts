import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/tasks/tasks.dto";

import { Task } from "../../models/entities/task.entity";
import { mapProjectToPreviewDTO } from "../projects/projects.mappers";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapTaskToDTO(task: Task): TaskDTO {
  return {
    id: task.task_id,
    name: task.name,
    description: task.description,
    status: task.status,
    start_date: task.start_date,
    end_date: task.end_date,
    time_spent: task.time_spent,
    estimated_time: task.estimated_time,
    user_created: mapUserToPreviewDTO(task.user_created),
    project: mapProjectToPreviewDTO(task.project),
    users_accountable: task.users_accountable.map(mapUserToPreviewDTO),
    created_at: task.created_at,
    updated_at: task.updated_at
  };
}

export function mapTaskToPreviewDTO(task: Task): TaskPreviewDTO {
  return {
    id: task.task_id,
    name: task.name,
    status: task.status,
    project: mapProjectToPreviewDTO(task.project),
    user_created: mapUserToPreviewDTO(task.user_created),
    users_accountable: task.users_accountable.map(mapUserToPreviewDTO)
  };
}
