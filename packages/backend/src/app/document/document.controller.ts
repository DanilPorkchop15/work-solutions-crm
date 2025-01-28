import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentPermissionGuard } from "@backend/app/document-permission/document-permission.guard";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  DocumentApi,
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
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    return this.documentsService.findOne(documentId);
  }

  @Post(DOCUMENTS_ROUTES.create())
  async create(@Body() dto: DocumentCreateRequestDTO): Promise<DocumentDTO> {
    return this.documentsService.create(dto);
  }

  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async update(@Param("documentId") documentId: string, @Body() dto: DocumentUpdateRequestDTO): Promise<DocumentDTO> {
    return this.documentsService.update(documentId, dto);
  }

  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async delete(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.delete(documentId);
  }

  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async restore(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.restore(documentId);
  }
}
