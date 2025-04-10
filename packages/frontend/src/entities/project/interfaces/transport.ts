import {
  ProjectBulkDeleteRequestDTO,
  ProjectBulkRestoreRequestDTO,
  ProjectCreateRequestDTO,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project/project.api";

import { TableDto } from "../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../shared/model/interfaces/transport";

import type { Project, ProjectPreview } from "./domain";

export type FindOneProjectRequest = Request<{ urlParams: { id: string } }>;
export type CreateProjectRequest = Request<{ body: ProjectCreateRequestDTO }>;
export type UpdateProjectRequest = Request<{ urlParams: { id: string }; body: ProjectUpdateRequestDTO }>;
export type DeleteProjectRequest = Request<{ urlParams: { id: string } }>;
export type RestoreProjectRequest = Request<{ urlParams: { id: string } }>;

export type BulkDeleteProjectRequest = Request<{ body: ProjectBulkDeleteRequestDTO }>;
export type BulkRestoreProjectRequest = Request<{ body: ProjectBulkRestoreRequestDTO }>;

export interface ProjectsTransport {
  getProject: Endpoint<FindOneProjectRequest, Project>;
  getProjects: Endpoint<void, TableDto<ProjectPreview>>;
  createProject: Endpoint<CreateProjectRequest, Project>;
  updateProject: Endpoint<UpdateProjectRequest, Project>;
  deleteProject: Endpoint<DeleteProjectRequest, void>;
  restoreProject: Endpoint<RestoreProjectRequest, void>;
  bulkDeleteProject: Endpoint<BulkDeleteProjectRequest, void>;
  bulkRestoreProject: Endpoint<BulkRestoreProjectRequest, void>;
}
