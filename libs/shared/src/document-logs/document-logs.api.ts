import { APIRoutes } from "../api-routes";

import { DocumentLogDTO } from "./document-logs.dto";

export interface DocumentLogsApi {
  findAll: (documentId: string) => Promise<DocumentLogDTO[]>;
}

export const DOCUMENT_LOGS_ROUTES: APIRoutes<DocumentLogsApi> = {
  findAll: (documentId: string) => `/documents/${documentId}/logs`
};
