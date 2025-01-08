import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  DOCUMENT_COMMENTS_ROUTES,
  DocumentCommentsApi
} from "@work-solutions-crm/libs/shared/document-comments/document-comments.api";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comments/document-comments.dto";

@Controller()
export class DocumentCommentsController implements DocumentCommentsApi {
  @Get(DOCUMENT_COMMENTS_ROUTES.findAll(":documentId"))
  findAll(@Param("documentId") documentId: string): Promise<DocumentCommentDTO[]> {
    // TODO: Add service logic for fetching all comments for a specific document
    return Promise.resolve([]);
  }

  @Post(DOCUMENT_COMMENTS_ROUTES.create(":documentId"))
  create(@Param("documentId") documentId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic for creating a comment for a specific document
    return Promise.resolve(undefined);
  }

  @Patch(DOCUMENT_COMMENTS_ROUTES.update(":documentCommentId"))
  update(@Param("documentCommentId") documentCommentId: string, @Body("text") text: string): Promise<void> {
    // TODO: Add service logic for updating a specific comment by ID
    return Promise.resolve(undefined);
  }

  @Delete(DOCUMENT_COMMENTS_ROUTES.delete(":documentCommentId"))
  delete(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    // TODO: Add service logic for deleting a specific comment by ID
    return Promise.resolve(undefined);
  }

  @Patch(DOCUMENT_COMMENTS_ROUTES.restore(":documentCommentId"))
  restore(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    // TODO: Add service logic for restoring a specific comment by ID
    return Promise.resolve(undefined);
  }
}
