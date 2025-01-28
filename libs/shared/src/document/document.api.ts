import { APIRoutes } from "../api-routes";

import { DocumentDTO, DocumentPreviewDTO } from "./document.dto";

export interface DocumentCreateRequestDTO {
  name: string;
  description?: string;
  document_url: string;
}

export interface DocumentBulkDeleteRequestDTO {
  document_ids: string[];
}

export type DocumentBulkRestoreRequestDTO = DocumentBulkDeleteRequestDTO;

export type DocumentUpdateRequestDTO = Partial<DocumentCreateRequestDTO>;

export interface DocumentApi {
  findAll: () => Promise<DocumentPreviewDTO[]>;
  findOne: (documentId: string) => Promise<DocumentDTO>;
  create: (dto: DocumentCreateRequestDTO) => Promise<DocumentDTO>;
  update: (documentId: string, dto: DocumentUpdateRequestDTO) => Promise<DocumentDTO>;
  delete: (documentId: string) => Promise<void>;
  restore: (documentId: string) => Promise<void>;
  upload: (documentId: string, file: File) => Promise<void>;
  bulkDelete: (documentIds: DocumentBulkDeleteRequestDTO) => Promise<void>;
  bulkRestore: (documentIds: DocumentBulkRestoreRequestDTO) => Promise<void>;
}

export const DOCUMENTS_ROUTES: APIRoutes<DocumentApi> = {
  findAll: () => "/document",
  findOne: (documentId: string) => `/documents/${documentId}`,
  create: () => "/document",
  update: (documentId: string) => `/documents/${documentId}`,
  delete: (documentId: string) => `/documents/${documentId}`,
  restore: (documentId: string) => `/documents/${documentId}/restore`,
  upload: (documentId: string) => `/documents/${documentId}/upload`,
  bulkDelete: () => "/documents/bulk-delete",
  bulkRestore: () => "/documents/bulk-restore"
};
