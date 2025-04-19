import {
  DocumentBulkDeleteRequestDTO,
  DocumentBulkRestoreRequestDTO,
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";

import { Endpoint, Request, TableDto } from "../../../../shared/model/interfaces";

import type { Document, DocumentPreview } from "./domain";

export type FindOneDocumentRequest = Request<{ urlParams: { id: string } }>;
export type CreateDocumentRequest = Request<{ body: DocumentCreateRequestDTO }>;
export type UpdateDocumentRequest = Request<{ urlParams: { id: string }; body: DocumentUpdateRequestDTO }>;
export type DeleteDocumentRequest = Request<{ urlParams: { id: string } }>;
export type RestoreDocumentRequest = Request<{ urlParams: { id: string } }>;

export type BulkDeleteDocumentRequest = Request<{ body: DocumentBulkDeleteRequestDTO }>;
export type BulkRestoreDocumentRequest = Request<{ body: DocumentBulkRestoreRequestDTO }>;

export interface DocumentsTransport {
  getDocument: Endpoint<FindOneDocumentRequest, Document>;
  getDocuments: Endpoint<void, TableDto<DocumentPreview>>;
  createDocument: Endpoint<CreateDocumentRequest, Document>;
  updateDocument: Endpoint<UpdateDocumentRequest, Document>;
  deleteDocument: Endpoint<DeleteDocumentRequest>;
  restoreDocument: Endpoint<RestoreDocumentRequest>;
  bulkDeleteDocument: Endpoint<BulkDeleteDocumentRequest>;
  bulkRestoreDocument: Endpoint<BulkRestoreDocumentRequest>;
}
