import { RequestManager } from "@frontend/shared/lib/requestManager";
import { TableDto } from "@frontend/shared/model/interfaces";
import { DOCUMENT_LOGS_ROUTES } from "@work-solutions-crm/libs/shared/document-log/document-log.api";
import { singleton } from "tsyringe";

import { tableDecoder } from "../../../../shared/api";
import { DocumentLog, DocumentLogsTransport, FindAllDocumentLogsRequest } from "../../interfaces";

import { documentLogDecoder } from "./decoder";

@singleton()
export class DocumentLogsApi extends RequestManager implements DocumentLogsTransport {
  public async getDocumentLogs(request: FindAllDocumentLogsRequest): Promise<TableDto<DocumentLog>> {
    return this.createRequest({
      url: DOCUMENT_LOGS_ROUTES.findAll(request.urlParams.documentId),
      serverDataDecoder: tableDecoder(documentLogDecoder)
    })(request);
  }
} 