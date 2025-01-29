import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentCreateValidationDTO, DocumentUpdateValidationDTO } from "@backend/app/document/document.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  // @ApiResponse({ status: 200, type: [DocumentPreviewDTO] })
  async findAll(): Promise<DocumentPreviewDTO[]> {
    return this.documentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(DOCUMENTS_ROUTES.findOne(":documentId"))
  @ApiOperation({ summary: "Get document by id" })
  // @ApiOkResponse({ type: DocumentDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  async findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    return this.documentsService.findOne(documentId);
  }

  @UseGuards(AuthGuard)
  @Post(DOCUMENTS_ROUTES.create())
  @ApiOperation({ summary: "Create document" })
  // @ApiCreatedResponse({ type: DocumentDTO })
  async create(@Body() dto: DocumentCreateValidationDTO): Promise<DocumentDTO> {
    return this.documentsService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  @ApiOperation({ summary: "Update document" })
  // @ApiOkResponse({ type: DocumentDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  async update(
    @Param("documentId") documentId: string,
    @Body() dto: DocumentUpdateValidationDTO
  ): Promise<DocumentDTO> {
    return this.documentsService.update(documentId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  @ApiOperation({ summary: "Delete document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async delete(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.delete(documentId);
  }

  @UseGuards(AuthGuard)
  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  @ApiOperation({ summary: "Restore document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async restore(@Param("documentId") documentId: string): Promise<void> {
    return this.documentsService.restore(documentId);
  }
}
