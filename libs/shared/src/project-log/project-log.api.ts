import { APIRoutes } from "../api-routes";

import { ProjectLogDTO } from "./project-log.dto";

export interface ProjectLogApi {
  findAll: (projectId: string) => Promise<ProjectLogDTO[]>;
}

export const PROJECT_LOGS_ROUTES: APIRoutes<ProjectLogApi> = {
  findAll: (projectId: string) => `/projects/${projectId}/logs`
};
