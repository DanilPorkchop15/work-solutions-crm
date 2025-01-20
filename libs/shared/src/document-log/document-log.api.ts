import { APIRoutes } from "../api-routes";

import { DocumentLogDTO } from "./document-log.dto";

export interface DocumentLogApi {
  findAll: (documentId: string) => Promise<DocumentLogDTO[]>;
}

export const DOCUMENT_LOGS_ROUTES: APIRoutes<DocumentLogApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/logs`
};
