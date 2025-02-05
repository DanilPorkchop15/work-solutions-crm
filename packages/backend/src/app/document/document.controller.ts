import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  DocumentApi,
  DocumentBulkDeleteRequestDTO,
  DocumentBulkRestoreRequestDTO,
  DocumentCreateRequestDTO,
  DOCUMENTS_ROUTES,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";

import { DocumentService } from "./document.service";

@Controller()
export class DocumentController implements DocumentApi {
  constructor(private readonly documentsService: DocumentService) {}

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

  @Delete(DOCUMENTS_ROUTES.bulkDelete())
  bulkDelete(@Body() documentIds: DocumentBulkDeleteRequestDTO): Promise<void> {
    return this.documentsService.bulkDelete(documentIds);
  }

  @Patch(DOCUMENTS_ROUTES.bulkRestore())
  bulkRestore(@Body() documentIds: DocumentBulkRestoreRequestDTO): Promise<void> {
    return this.documentsService.bulkRestore(documentIds);
  }

  // TODO : implement
  upload(documentId: string, file: File): Promise<void> {
    return Promise.resolve(undefined);
  }
}
