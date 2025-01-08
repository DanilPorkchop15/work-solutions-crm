import { APIRoutes } from "../api-routes";

import { TaskLogDTO } from "./task-logs.dto";

export interface TaskLogsApi {
  findAll: (taskId: string) => Promise<TaskLogDTO[]>;
}

export const TASK_LOGS_ROUTES: APIRoutes<TaskLogsApi> = {
  findAll: (taskId: string) => `/tasks/${taskId}/logs`
};
