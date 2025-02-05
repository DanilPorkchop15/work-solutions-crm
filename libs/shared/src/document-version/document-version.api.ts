import { APIRoutes } from "../api-routes";

import { DocumentVersionDTO } from "./document-version.dto";

export interface DocumentVersionApi {
  findAll: (documentId: string) => Promise<DocumentVersionDTO[]>;
  upload: (documentId: string, ...omitted: any) => Promise<void>;
}

export const DOCUMENT_VERSIONS_ROUTES: APIRoutes<DocumentVersionApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/versions`,
  upload: (documentId: string) => `/documents/${documentId}/versions/upload`
};
