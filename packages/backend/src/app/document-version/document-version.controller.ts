import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentPermissionGuard } from "@backend/app/document-permission/document-permission.guard";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionApi
} from "@work-solutions-crm/libs/shared/document-version/document-version.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

import { DocumentVersionService } from "./document-version.service";

@Controller()
export class DocumentVersionController implements DocumentVersionApi {
  constructor(private readonly documentVersionsService: DocumentVersionService) {}

  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }
}
