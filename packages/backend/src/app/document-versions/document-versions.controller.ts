import { Controller, Get, Param } from "@nestjs/common";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionsApi
} from "@work-solutions-crm/libs/shared/document-versions/document-versions.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-versions/document-versions.dto";

import { DocumentVersionsService } from "./document-versions.service";

@Controller()
export class DocumentVersionsController implements DocumentVersionsApi {
  constructor(private readonly documentVersionsService: DocumentVersionsService) {}

  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }
}
