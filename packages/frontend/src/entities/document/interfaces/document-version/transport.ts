import { Endpoint, Request, TableDto } from "../../../../shared/model/interfaces";

import type { DocumentVersion } from "./domain";

export type DocumentFindAllVersionsRequest = Request<{ urlParams: { documentId: string } }>;
export type DocumentVersionUploadRequest = Request<{ body: FormData; urlParams: { documentId: string } }>;

export interface DocumentVersionsTransport {
  getDocumentVersions: Endpoint<DocumentFindAllVersionsRequest, TableDto<DocumentVersion>>;
  uploadVersion: Endpoint<DocumentVersionUploadRequest>;
}
