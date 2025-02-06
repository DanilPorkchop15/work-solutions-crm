import { APIRoutes } from "../api-routes";

import { TaskDTO, TaskPreviewDTO, TaskStatus } from "./task.dto";

export interface TaskCreateRequestDTO {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
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
  create: (dto: TaskCreateRequestDTO, ...omitted: never) => Promise<TaskDTO>;
  update: (taskId: string, dto: TaskUpdateRequestDTO, ...omitted: never) => Promise<TaskDTO>;
  delete: (taskId: string, ...omitted: never) => Promise<void>;
  restore: (taskId: string, ...omitted: never) => Promise<void>;
  bulkDelete: (dto: TaskBulkDeleteRequestDTO, ...omitted: never) => Promise<void>;
  bulkRestore: (dto: TaskBulkRestoreRequestDTO, ...omitted: never) => Promise<void>;
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
