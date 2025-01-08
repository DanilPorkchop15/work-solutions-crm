import { APIRoutes } from "../api-routes";

import { TaskCommentDTO } from "./task-comments.dto";

export interface TaskCommentsApi {
  findAll: (taskId: string) => Promise<TaskCommentDTO[]>;
  create: (taskId: string, text: string) => Promise<void>;
  update: (taskCommentId: string, text: string) => Promise<void>;
  delete: (taskCommentId: string) => Promise<void>;
  restore: (taskCommentId: string) => Promise<void>;
}

export const TASK_COMMENTS_ROUTES: APIRoutes<TaskCommentsApi> = {
  findAll: (taskId: string) => `/tasks/${taskId}/comments`,
  create: (taskId: string) => `/tasks/${taskId}/comments`,
  update: (taskCommentId: string) => `/tasks-comments/${taskCommentId}`,
  delete: (taskCommentId: string) => `/task-comments/${taskCommentId}`,
  restore: (taskCommentId: string) => `/task-comments/${taskCommentId}/restore`
};
