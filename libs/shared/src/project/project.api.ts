import { APIRoutes } from "../api-routes";

import { ProjectDTO, ProjectPreviewDTO, ProjectStatus } from "./project.dto";

export interface ProjectCreateRequestDTO {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  budget?: number;
  customer_id: string;
  users_accountable: {
    id: string;
  }[];
  status?: ProjectStatus;
}

export type ProjectUpdateRequestDTO = Partial<ProjectCreateRequestDTO>;

export interface ProjectApi {
  findAll: () => Promise<ProjectPreviewDTO[]>;
  findOne: (projectId: string) => Promise<ProjectDTO>;
  create: (dto: ProjectCreateRequestDTO) => Promise<ProjectDTO>;
  update: (projectId: string, dto: ProjectUpdateRequestDTO) => Promise<ProjectDTO>;
  delete: (projectId: string) => Promise<void>;
  restore: (projectId: string) => Promise<void>;
}

export const PROJECTS_ROUTES: APIRoutes<ProjectApi> = {
  findAll: () => "/projects",
  findOne: (projectId: string) => `/projects/${projectId}`,
  create: () => "/projects",
  update: (projectId: string) => `/projects/${projectId}`,
  delete: (projectId: string) => `/projects/${projectId}`,
  restore: (projectId: string) => `/projects/${projectId}/restore`
};
