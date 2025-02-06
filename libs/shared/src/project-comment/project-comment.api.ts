import { APIRoutes } from "../api-routes";

import { ProjectCommentDTO } from "./project-comment.dto";

export interface ProjectCommentCreateRequestDTO {
  text: string;
}

export type ProjectCommentUpdateRequestDTO = ProjectCommentCreateRequestDTO;

export interface ProjectCommentApi {
  findAll: (projectId: string) => Promise<ProjectCommentDTO[]>;
  create: (projectId: string, dto: ProjectCommentCreateRequestDTO, ...omitted: never) => Promise<void>;
  update: (projectCommentId: string, dto: ProjectCommentUpdateRequestDTO, ...omitted: never) => Promise<void>;
  delete: (projectCommentId: string, ...omitted: never) => Promise<void>;
  restore: (projectCommentId: string, ...omitted: never) => Promise<void>;
}

export const PROJECT_COMMENTS_ROUTES: APIRoutes<ProjectCommentApi> = {
  findAll: (projectId: string) => `/projects/${projectId}/comments`,
  create: (projectId: string) => `/projects/${projectId}/comments`,
  update: (projectCommentId: string) => `/project-comments/${projectCommentId}`,
  delete: (projectCommentId: string) => `/project-comments/${projectCommentId}`,
  restore: (projectCommentId: string) => `/project-comments/${projectCommentId}/restore`
};
