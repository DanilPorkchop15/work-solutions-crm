import {
  ProjectCommentCreateRequestDTO,
  ProjectCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";

import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { ProjectComment } from "./domain";

export type FindAllProjectCommentsRequest = Request<{ urlParams: { projectId: string } }>;
export type CreateProjectCommentRequest = Request<{ urlParams: { id: string }; body: ProjectCommentCreateRequestDTO }>;
export type UpdateProjectCommentRequest = Request<{ urlParams: { id: string }; body: ProjectCommentUpdateRequestDTO }>;
export type DeleteProjectCommentRequest = Request<{ urlParams: { id: string } }>;
export type RestoreProjectCommentRequest = Request<{ urlParams: { id: string } }>;

export interface ProjectCommentsTransport {
  getProjectComments: Endpoint<FindAllProjectCommentsRequest, TableDto<ProjectComment>>;
  createProjectComment: Endpoint<CreateProjectCommentRequest>;
  updateProjectComment: Endpoint<UpdateProjectCommentRequest>;
  deleteProjectComment: Endpoint<DeleteProjectCommentRequest>;
  restoreProjectComment: Endpoint<RestoreProjectCommentRequest>;
}
