import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  DocumentBulkDeleteValidationDTO,
  DocumentBulkRestoreValidationDTO,
  DocumentCreateValidationDTO,
  DocumentPreviewResponseDTO,
  DocumentResponseDTO,
  DocumentUpdateValidationDTO
} from "@backend/app/document/document.dto";
import { DocumentPermissionGuard } from "@backend/app/document-permission/document-permission.guard";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { DocumentApi, DOCUMENTS_ROUTES } from "@work-solutions-crm/libs/shared/document/document.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";

import { DocumentService } from "./document.service";

@ApiTags("Documents")
@ApiBearerAuth()
@Controller()
export class DocumentController implements DocumentApi {
  constructor(private readonly documentsService: DocumentService) {}

  @UseGuards(AuthGuard)
  @Get(DOCUMENTS_ROUTES.findAll())
  @ApiOperation({ summary: "Get all documents" })
  @ApiResponse({ status: 200, type: [DocumentPreviewResponseDTO] })
  async findAll(): Promise<DocumentPreviewDTO[]> {
    return this.documentsService.findAll();
  }

  @Get(DOCUMENTS_ROUTES.findOne(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  @ApiOperation({ summary: "Get document by id" })
  @ApiOkResponse({ type: DocumentResponseDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  async findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    return this.documentsService.findOne(documentId);
  }

  @Post(DOCUMENTS_ROUTES.create())
  @ApiOperation({ summary: "Create document" })
  @ApiCreatedResponse({ type: DocumentResponseDTO })
  async create(@Body() dto: DocumentCreateValidationDTO): Promise<DocumentDTO> {
    return this.documentsService.create(dto);
  }

  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  @ApiOperation({ summary: "Update document" })
  @ApiOkResponse({ type: DocumentResponseDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  async update(
    @Param("documentId") documentId: string,
    @Body() dto: DocumentUpdateValidationDTO
  ): Promise<DocumentDTO> {
    return this.documentsService.update(documentId, dto);
  }

  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  @ApiOperation({ summary: "Delete document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async delete(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.delete(documentId);
  }

  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  @ApiOperation({ summary: "Restore document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async restore(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.restore(documentId);
  }

  @Delete(DOCUMENTS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Bulk delete documents" })
  @ApiBody({ type: DocumentBulkDeleteValidationDTO })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  bulkDelete(@Body() documentIds: DocumentBulkDeleteValidationDTO): Promise<void> {
    return this.documentsService.bulkDelete(documentIds);
  }

  @Patch(DOCUMENTS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore documents" })
  @ApiBody({ type: DocumentBulkRestoreValidationDTO })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  bulkRestore(@Body() documentIds: DocumentBulkRestoreValidationDTO): Promise<void> {
    return this.documentsService.bulkRestore(documentIds);
  }
}
