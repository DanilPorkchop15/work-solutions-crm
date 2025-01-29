import { AuthGuard } from "@backend/app/auth/auth.guard";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DOCUMENT_LOGS_ROUTES, DocumentLogApi } from "@work-solutions-crm/libs/shared/document-log/document-log.api";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";

import { DocumentLogService } from "./document-log.service";

@ApiTags("Document Logs")
@ApiBearerAuth()
@Controller()
export class DocumentLogController implements DocumentLogApi {
  constructor(private readonly documentLogsService: DocumentLogService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Find all document logs by document id" })
  @Get(DOCUMENT_LOGS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentLogDTO[]> {
    return this.documentLogsService.findAll(documentId);
  }
}
