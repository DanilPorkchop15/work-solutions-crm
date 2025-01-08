import { APIRoutes } from "../api-routes";

import { ProjectLogDTO } from "./project-logs.dto";

export interface ProjectLogsApi {
  findAll: (projectId: string) => Promise<ProjectLogDTO[]>;
}

export const PROJECT_LOGS_ROUTES: APIRoutes<ProjectLogsApi> = {
  findAll: (projectId: string) => `/projects/${projectId}/logs`
};
