import { Controller, Get, Param } from "@nestjs/common";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionsApi
} from "@work-solutions-crm/libs/shared/document-versions/document-versions.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-versions/document-versions.dto";

@Controller()
export class DocumentVersionsController implements DocumentVersionsApi {
  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    // TODO
    return Promise.resolve([]);
  }
}
