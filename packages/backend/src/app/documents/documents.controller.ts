import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  DocumentCreateRequestDTO,
  DOCUMENTS_ROUTES,
  DocumentsApi,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/documents/documents.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/documents/documents.dto";

@Controller()
export class DocumentsController implements DocumentsApi {
  @Get(DOCUMENTS_ROUTES.findAll())
  findAll(): Promise<DocumentPreviewDTO[]> {
    // TODO: Add service call to fetch all documents
    return Promise.resolve([]);
  }

  @Get(DOCUMENTS_ROUTES.findOne(":documentId"))
  findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    // TODO: Add service call to fetch a specific document by ID
    return Promise.resolve(undefined);
  }

  @Post(DOCUMENTS_ROUTES.create())
  create(@Body() dto: DocumentCreateRequestDTO): Promise<DocumentDTO> {
    // TODO: Add service call to create a document
    return Promise.resolve(undefined);
  }

  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  update(@Param("documentId") documentId: string, @Body() dto: DocumentUpdateRequestDTO): Promise<DocumentDTO> {
    // TODO: Add service call to update a specific document by ID
    return Promise.resolve(undefined);
  }

  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  delete(@Param("documentId") documentId: string): Promise<void> {
    // TODO: Add service call to delete a document by ID
    return Promise.resolve(undefined);
  }

  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  restore(@Param("documentId") documentId: string): Promise<void> {
    // TODO: Add service call to restore a specific document by ID
    return Promise.resolve(undefined);
  }
}
