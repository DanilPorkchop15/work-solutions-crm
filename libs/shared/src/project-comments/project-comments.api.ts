import { APIRoutes } from "../api-routes";

import { ProjectCommentDTO } from "./project-comments.dto";

export interface ProjectCommentsApi {
  findAll: (projectId: string) => Promise<ProjectCommentDTO[]>;
  create: (projectId: string, text: string) => void;
  update: (projectCommentId: string, text: string) => void;
  delete: (projectCommentId: string) => void;
  restore: (projectCommentId: string) => void;
}

export const PROJECT_COMMENTS_ROUTES: APIRoutes<ProjectCommentsApi> = {
  findAll: (projectId: string) => `/projects/${projectId}/comments`,
  create: (projectId: string, text: string) => `/projects/${projectId}/comments`,
  update: (projectCommentId: string, text: string) => `/project-comments/${projectCommentId}`,
  delete: (projectCommentId: string) => `/project-comments/${projectCommentId}`,
  restore: (projectCommentId: string) => `/project-comments/${projectCommentId}/restore`
};
