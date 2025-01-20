import { APIRoutes } from "../api-routes";

import { TaskLogDTO } from "./task-log.dto";

export interface TaskLogApi {
  findAll: (taskId: string) => Promise<TaskLogDTO[]>;
}

export const TASK_LOGS_ROUTES: APIRoutes<TaskLogApi> = {
  findAll: (taskId: string) => `/tasks/${taskId}/logs`
};
