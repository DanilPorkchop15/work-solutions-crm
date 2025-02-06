import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import { APIRoutes } from "../api-routes";

import { DocumentDTO, DocumentPreviewDTO } from "./document.dto";

export interface DocumentCreateRequestDTO {
  name: string;
  description?: string;
  document_url: string;
  roles: Role[];
}

export interface DocumentBulkDeleteRequestDTO {
  document_ids: string[];
}

export type DocumentBulkRestoreRequestDTO = DocumentBulkDeleteRequestDTO;

export type DocumentUpdateRequestDTO = Partial<DocumentCreateRequestDTO>;

export interface DocumentApi {
  findAll: () => Promise<DocumentPreviewDTO[]>;
  findOne: (documentId: string) => Promise<DocumentDTO>;
  create: (dto: DocumentCreateRequestDTO, ...omitted: never) => Promise<DocumentDTO>;
  update: (documentId: string, dto: DocumentUpdateRequestDTO, ...omitted: never) => Promise<DocumentDTO>;
  delete: (documentId: string, ...omitted: never) => Promise<void>;
  restore: (documentId: string, ...omitted: never) => Promise<void>;
  bulkDelete: (documentIds: DocumentBulkDeleteRequestDTO, ...omitted: never) => Promise<void>;
  bulkRestore: (documentIds: DocumentBulkRestoreRequestDTO, ...omitted: never) => Promise<void>;
}

export const DOCUMENTS_ROUTES: APIRoutes<DocumentApi> = {
  findAll: () => "/documents",
  findOne: (documentId: string) => `/documents/${documentId}`,
  create: () => "/documents",
  update: (documentId: string) => `/documents/${documentId}`,
  delete: (documentId: string) => `/documents/${documentId}`,
  restore: (documentId: string) => `/documents/${documentId}/restore`,
  bulkDelete: () => "/documents/bulk-delete",
  bulkRestore: () => "/documents/bulk-restore"
};
