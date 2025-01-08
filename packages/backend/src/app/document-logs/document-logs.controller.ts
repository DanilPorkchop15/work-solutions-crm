import { Controller, Get, Param } from "@nestjs/common";
import { DOCUMENT_LOGS_ROUTES, DocumentLogsApi } from "@work-solutions-crm/libs/shared/document-logs/document-logs.api";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-logs/document-logs.dto";

@Controller()
export class DocumentLogsController implements DocumentLogsApi {
  @Get(DOCUMENT_LOGS_ROUTES.findAll(":dpcumentId"))
  findAll(@Param("documentId") documentId: string): Promise<DocumentLogDTO[]> {
    // TODO
    return Promise.resolve([]);
  }
}
