import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { DocumentLog } from "./domain";

export type FindAllDocumentLogsRequest = Request<{ urlParams: { documentId: string } }>;

export interface DocumentLogsTransport {
  getDocumentLogs: Endpoint<FindAllDocumentLogsRequest, TableDto<DocumentLog>>;
} 