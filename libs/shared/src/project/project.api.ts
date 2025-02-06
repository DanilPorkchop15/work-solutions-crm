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

export interface ProjectBulkDeleteRequestDTO {
  project_ids: string[];
}

export interface ProjectBulkRestoreRequestDTO {
  project_ids: string[];
}

export interface ProjectApi {
  findAll: () => Promise<ProjectPreviewDTO[]>;
  findOne: (projectId: string, ...omitted: never) => Promise<ProjectDTO>;
  create: (dto: ProjectCreateRequestDTO, ...omitted: never) => Promise<ProjectDTO>;
  update: (projectId: string, dto: ProjectUpdateRequestDTO, ...omitted: never) => Promise<ProjectDTO>;
  delete: (projectId: string, ...omitted: never) => Promise<void>;
  restore: (projectId: string, ...omitted: never) => Promise<void>;
  bulkDelete: (projectIds: ProjectBulkDeleteRequestDTO, ...omitted: never) => Promise<void>;
  bulkRestore: (projectIds: ProjectBulkRestoreRequestDTO, ...omitted: never) => Promise<void>;
}

export const PROJECTS_ROUTES: APIRoutes<ProjectApi> = {
  findAll: () => "/projects",
  findOne: (projectId: string) => `/projects/${projectId}`,
  create: () => "/projects",
  update: (projectId: string) => `/projects/${projectId}`,
  delete: (projectId: string) => `/projects/${projectId}`,
  restore: (projectId: string) => `/projects/${projectId}/restore`,
  bulkDelete: () => "/projects/bulk-delete",
  bulkRestore: () => "/projects/bulk-restore"
};
