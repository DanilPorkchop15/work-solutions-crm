import { APIRoutes } from "../api-routes";

import { DocumentCommentDTO } from "./document-comments.dto";

export interface DocumentCommentsApi {
  findAll: (documentId: string) => Promise<DocumentCommentDTO[]>;
  create: (documentId: string, text: string) => void;
  update: (documentCommentId: string, text: string) => void;
  delete: (documentCommentId: string) => void;
  restore: (documentCommentId: string) => void;
}

export const DOCUMENT_COMMENTS_ROUTES: APIRoutes<DocumentCommentsApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/comments`,
  create: (documentId: string, text: string) => `/documents/${documentId}/comments`,
  update: (documentCommentId: string, text: string) => `/document-comments/${documentCommentId}`,
  delete: (documentCommentId: string) => `/document-comments/${documentCommentId}`,
  restore: (documentCommentId: string) => `/document-comments/${documentCommentId}/restore`
};
