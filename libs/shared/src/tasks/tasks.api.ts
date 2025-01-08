import { APIRoutes } from "../api-routes";

import { TaskDTO, TaskPreviewDTO, TaskStatus } from "./tasks.dto";

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

export interface TasksApi {
  findAll: () => Promise<TaskPreviewDTO[]>;
  findOne: (taskId: string) => Promise<TaskDTO>;
  create: (dto: TaskCreateRequestDTO) => Promise<TaskDTO>;
  update: (taskId: string, dto: TaskUpdateRequestDTO) => Promise<TaskDTO>;
  delete: (taskId: string) => Promise<void>;
  restore: (taskId: string) => Promise<void>;
}

export const TASKS_ROUTES: APIRoutes<TasksApi> = {
  findAll: () => "/tasks",
  findOne: (taskId: string) => `/tasks/${taskId}`,
  create: () => "/tasks",
  update: (taskId: string) => `/tasks/${taskId}`,
  delete: (taskId: string) => `/tasks/${taskId}`,
  restore: (taskId: string) => `/tasks/${taskId}/restore`
};
