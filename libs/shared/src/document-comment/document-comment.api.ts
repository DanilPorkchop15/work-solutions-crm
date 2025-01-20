import { APIRoutes } from "../api-routes";

import { DocumentCommentDTO } from "./document-comment.dto";

export interface DocumentCommentApi {
  findAll: (documentId: string) => Promise<DocumentCommentDTO[]>;
  create: (documentId: string, text: string) => Promise<void>;
  update: (documentCommentId: string, text: string) => Promise<void>;
  delete: (documentCommentId: string) => Promise<void>;
  restore: (documentCommentId: string) => Promise<void>;
}

export const DOCUMENT_COMMENTS_ROUTES: APIRoutes<DocumentCommentApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/comments`,
  create: (documentId: string) => `/documents/${documentId}/comments`,
  update: (documentCommentId: string) => `/document-comments/${documentCommentId}`,
  delete: (documentCommentId: string) => `/document-comments/${documentCommentId}`,
  restore: (documentCommentId: string) => `/document-comments/${documentCommentId}/restore`
};
