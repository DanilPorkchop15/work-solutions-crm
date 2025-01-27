import { APIRoutes } from "../api-routes";

import { DocumentDTO, DocumentPreviewDTO } from "./document.dto";

export interface DocumentCreateRequestDTO {
  name: string;
  description?: string;
  document_url: string;
}

export type DocumentUpdateRequestDTO = Partial<DocumentCreateRequestDTO>;

export interface DocumentApi {
  findAll: () => Promise<DocumentPreviewDTO[]>;
  findOne: (documentId: string) => Promise<DocumentDTO>;
  create: (dto: DocumentCreateRequestDTO) => Promise<DocumentDTO>;
  update: (documentId: string, dto: DocumentUpdateRequestDTO) => Promise<DocumentDTO>;
  delete: (documentId: string) => Promise<void>;
  restore: (documentId: string) => Promise<void>;
}

export const DOCUMENTS_ROUTES: APIRoutes<DocumentApi> = {
  findAll: () => "/documents",
  findOne: (documentId: string) => `/documents/${documentId}`,
  create: () => "/documents",
  update: (documentId: string) => `/documents/${documentId}`,
  delete: (documentId: string) => `/documents/${documentId}`,
  restore: (documentId: string) => `/documents/${documentId}/restore`
};
