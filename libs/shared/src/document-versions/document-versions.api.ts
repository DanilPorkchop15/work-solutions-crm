import { APIRoutes } from "../api-routes";

import { DocumentVersionDTO } from "./document-versions.dto";

export interface DocumentVersionsApi {
  findAll: (documentId: string) => Promise<DocumentVersionDTO[]>;
}

export const DOCUMENT_VERSIONS_ROUTES: APIRoutes<DocumentVersionsApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/versions`
};
