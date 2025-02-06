import { APIRoutes } from "../api-routes";

import { DocumentCommentDTO } from "./document-comment.dto";

export interface DocumentCommentCreateRequestDTO {
  text: string;
}

export type DocumentCommentUpdateRequestDTO = DocumentCommentCreateRequestDTO;

export interface DocumentCommentApi {
  findAll: (documentId: string) => Promise<DocumentCommentDTO[]>;
  create: (documentId: string, dto: DocumentCommentCreateRequestDTO, ...omitted: never) => Promise<void>;
  update: (documentCommentId: string, dto: DocumentCommentUpdateRequestDTO, ...omitted: never) => Promise<void>;
  delete: (documentCommentId: string, ...omitted: never) => Promise<void>;
  restore: (documentCommentId: string, ...omitted: never) => Promise<void>;
}

export const DOCUMENT_COMMENTS_ROUTES: APIRoutes<DocumentCommentApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/comments`,
  create: (documentId: string) => `/documents/${documentId}/comments`,
  update: (documentCommentId: string) => `/document-comments/${documentCommentId}`,
  delete: (documentCommentId: string) => `/document-comments/${documentCommentId}`,
  restore: (documentCommentId: string) => `/document-comments/${documentCommentId}/restore`
};
