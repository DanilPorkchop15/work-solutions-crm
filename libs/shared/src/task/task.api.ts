import { APIRoutes } from "../api-routes";

import { TaskDTO, TaskPreviewDTO, TaskStatus } from "./task.dto";

export interface TaskCreateRequestDTO {
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  time_spent?: number;
  estimated_time?: number;
  project_id: string;
  users_accountable: {
    id: string;
  }[];
  status?: TaskStatus;
}

export type TaskUpdateRequestDTO = Partial<TaskCreateRequestDTO>;

export interface TaskBulkDeleteRequestDTO {
  task_ids: string[];
}

export type TaskBulkRestoreRequestDTO = TaskBulkDeleteRequestDTO;

export interface TaskApi {
  findAll: () => Promise<TaskPreviewDTO[]>;
  findOne: (taskId: string) => Promise<TaskDTO>;
  create: (dto: TaskCreateRequestDTO) => Promise<TaskDTO>;
  update: (taskId: string, dto: TaskUpdateRequestDTO) => Promise<TaskDTO>;
  delete: (taskId: string) => Promise<void>;
  restore: (taskId: string) => Promise<void>;
  bulkDelete: (dto: TaskBulkDeleteRequestDTO) => Promise<void>;
  bulkRestore: (dto: TaskBulkRestoreRequestDTO) => Promise<void>;
}

export const TASKS_ROUTES: APIRoutes<TaskApi> = {
  findAll: () => "/tasks",
  findOne: (taskId: string) => `/tasks/${taskId}`,
  create: () => "/tasks",
  update: (taskId: string) => `/tasks/${taskId}`,
  delete: (taskId: string) => `/tasks/${taskId}`,
  restore: (taskId: string) => `/tasks/${taskId}/restore`,
  bulkDelete: () => "/tasks/bulk-restore",
  bulkRestore: () => "/tasks/bulk-restore"
};
