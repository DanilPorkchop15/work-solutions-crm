import { Controller, Get, Param } from "@nestjs/common";
import { DOCUMENT_LOGS_ROUTES, DocumentLogApi } from "@work-solutions-crm/libs/shared/document-log/document-log.api";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";

import { DocumentLogService } from "./document-log.service";

@Controller()
export class DocumentLogController implements DocumentLogApi {
  constructor(private readonly documentLogsService: DocumentLogService) {}

  @Get(DOCUMENT_LOGS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentLogDTO[]> {
    return this.documentLogsService.findAll(documentId);
  }
}
