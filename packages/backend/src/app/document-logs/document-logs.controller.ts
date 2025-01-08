import { Controller, Get, Param } from "@nestjs/common";
import { DOCUMENT_LOGS_ROUTES, DocumentLogsApi } from "@work-solutions-crm/libs/shared/document-logs/document-logs.api";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-logs/document-logs.dto";

import { DocumentLogsService } from "./document-logs.service";

@Controller()
export class DocumentLogsController implements DocumentLogsApi {
  constructor(private readonly documentLogsService: DocumentLogsService) {}

  @Get(DOCUMENT_LOGS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentLogDTO[]> {
    return this.documentLogsService.findAll(documentId);
  }
}
