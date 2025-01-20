import { APIRoutes } from "../api-routes";

import { ProjectCommentDTO } from "./project-comment.dto";

export interface ProjectCommentApi {
  findAll: (projectId: string) => Promise<ProjectCommentDTO[]>;
  create: (projectId: string, text: string) => Promise<void>;
  update: (projectCommentId: string, text: string) => Promise<void>;
  delete: (projectCommentId: string) => Promise<void>;
  restore: (projectCommentId: string) => Promise<void>;
}

export const PROJECT_COMMENTS_ROUTES: APIRoutes<ProjectCommentApi> = {
  findAll: (projectId: string) => `/projects/${projectId}/comments`,
  create: (projectId: string) => `/projects/${projectId}/comments`,
  update: (projectCommentId: string) => `/project-comments/${projectCommentId}`,
  delete: (projectCommentId: string) => `/project-comments/${projectCommentId}`,
  restore: (projectCommentId: string) => `/project-comments/${projectCommentId}/restore`
};
