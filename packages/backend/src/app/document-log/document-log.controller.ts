import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentLogResponseDTO } from "@backend/app/document-log/document-log.dto";
import { CaslGuard } from "@backend/app/permission/casl.guard";
import { CheckPolicies } from "@backend/decorators/check-policies.decorator";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { DOCUMENT_LOGS_ROUTES, DocumentLogApi } from "@work-solutions-crm/libs/shared/document-log/document-log.api";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";

import { DocumentLogService } from "./document-log.service";

@ApiTags("Document Logs")
@ApiBearerAuth()
@Controller()
export class DocumentLogController implements DocumentLogApi {
  constructor(private readonly documentLogsService: DocumentLogService) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Find all document logs by document id" })
  @ApiOkResponse({ type: DocumentLogResponseDTO })
  @Get(DOCUMENT_LOGS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentLogDTO[]> {
    return this.documentLogsService.findAll(documentId);
  }
}
