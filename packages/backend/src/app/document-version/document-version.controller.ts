import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }

  @Post(DOCUMENT_VERSIONS_ROUTES.upload(":documentId"))
  @UseInterceptors(FileInterceptor("file"))
  async upload(@Param("documentId") documentId: string, @UploadedFile() file: Express.Multer.File) {
    await this.documentVersionsService.upload(documentId, file);
  }
}
