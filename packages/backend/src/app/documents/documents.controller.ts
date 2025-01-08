import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  DocumentCreateRequestDTO,
  DOCUMENTS_ROUTES,
  DocumentsApi,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/documents/documents.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/documents/documents.dto";

import { DocumentsService } from "./documents.service";

@Controller()
export class DocumentsController implements DocumentsApi {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(DOCUMENTS_ROUTES.findAll())
  async findAll(): Promise<DocumentPreviewDTO[]> {
    return this.documentsService.findAll();
  }

  @Get(DOCUMENTS_ROUTES.findOne(":documentId"))
  async findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    return this.documentsService.findOne(documentId);
  }

  @Post(DOCUMENTS_ROUTES.create())
  async create(@Body() dto: DocumentCreateRequestDTO): Promise<DocumentDTO> {
    return this.documentsService.create(dto);
  }

  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  async update(@Param("documentId") documentId: string, @Body() dto: DocumentUpdateRequestDTO): Promise<DocumentDTO> {
    return this.documentsService.update(documentId, dto);
  }

  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  async delete(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.delete(documentId);
  }

  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  async restore(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.restore(documentId);
  }
}
