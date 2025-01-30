import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentVersionResponseDTO } from "@backend/app/document-version/document-version.dto";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionApi
} from "@work-solutions-crm/libs/shared/document-version/document-version.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

import { DocumentVersionService } from "./document-version.service";

@ApiTags("Document Versions")
@ApiBearerAuth()
@Controller()
export class DocumentVersionController implements DocumentVersionApi {
  constructor(private readonly documentVersionsService: DocumentVersionService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all document versions" })
  @ApiResponse({ status: 200, type: [DocumentVersionResponseDTO] })
  @ApiParam({ name: "documentId", required: true })
  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }
}
