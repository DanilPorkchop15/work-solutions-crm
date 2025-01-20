import { APIRoutes } from "../api-routes";

import { DocumentVersionDTO } from "./document-version.dto";

export interface DocumentVersionApi {
  findAll: (documentId: string) => Promise<DocumentVersionDTO[]>;
}

export const DOCUMENT_VERSIONS_ROUTES: APIRoutes<DocumentVersionApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/versions`
};
