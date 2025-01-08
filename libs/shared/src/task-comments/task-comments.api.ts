import { APIRoutes } from "../api-routes";

import { TaskCommentDTO } from "./task-comments.dto";

export interface TaskCommentsApi {
  findAll: (taskId: string) => Promise<TaskCommentDTO[]>;
  create: (taskId: string, text: string) => void;
  update: (taskCommentId: string, text: string) => void;
  delete: (taskCommentId: string) => void;
  restore: (taskCommentId: string) => void;
}

export const TASK_COMMENTS_ROUTES: APIRoutes<TaskCommentsApi> = {
  findAll: (taskId: string) => `/tasks/${taskId}/comments`,
  create: (taskId: string, text: string) => `/tasks/${taskId}/comments`,
  update: (taskCommentId: string, text: string) => `/tasks-comments/${taskCommentId}`,
  delete: (taskCommentId: string) => `/task-comments/${taskCommentId}`,
  restore: (taskCommentId: string) => `/task-comments/${taskCommentId}/restore`
};
