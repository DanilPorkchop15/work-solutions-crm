import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  DOCUMENT_COMMENTS_ROUTES,
  DocumentCommentsApi
} from "@work-solutions-crm/libs/shared/document-comments/document-comments.api";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comments/document-comments.dto";

import { DocumentCommentsService } from "./document-comments.service";

@Controller()
export class DocumentCommentsController implements DocumentCommentsApi {
  constructor(private readonly documentCommentsService: DocumentCommentsService) {}

  @Get(DOCUMENT_COMMENTS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentCommentDTO[]> {
    return this.documentCommentsService.findAll(documentId);
  }

  @Post(DOCUMENT_COMMENTS_ROUTES.create(":documentId"))
  async create(@Param("documentId") documentId: string, @Body("text") text: string): Promise<void> {
    // TODO get user id from auth
    await this.documentCommentsService.create(documentId, "userId", text);
  }

  @Patch(DOCUMENT_COMMENTS_ROUTES.update(":documentCommentId"))
  async update(@Param("documentCommentId") documentCommentId: string, @Body("text") text: string): Promise<void> {
    await this.documentCommentsService.update(documentCommentId, text);
  }

  @Delete(DOCUMENT_COMMENTS_ROUTES.delete(":documentCommentId"))
  async delete(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.delete(documentCommentId);
  }

  @Patch(DOCUMENT_COMMENTS_ROUTES.restore(":documentCommentId"))
  async restore(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.restore(documentCommentId);
  }
}
