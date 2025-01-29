import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  DocumentCommentCreateValidationDTO,
  DocumentCommentUpdateValidationDTO
} from "@backend/app/document-comment/document-comment.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  DOCUMENT_COMMENTS_ROUTES,
  DocumentCommentApi
} from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comment/document-comment.dto";

import { DocumentCommentService } from "./document-comment.service";

@ApiTags("Document Comments")
@ApiBearerAuth()
@Controller()
export class DocumentCommentController implements DocumentCommentApi {
  constructor(private readonly documentCommentsService: DocumentCommentService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all comments for a document" })
  // @ApiResponse({ status: 200, type: [DocumentCommentDTO] })
  @Get(DOCUMENT_COMMENTS_ROUTES.findAll(":documentId"))
  async findAll(@Param("documentId") documentId: string): Promise<DocumentCommentDTO[]> {
    return this.documentCommentsService.findAll(documentId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create a new comment for a document" })
  @ApiResponse({ status: 201 })
  @Post(DOCUMENT_COMMENTS_ROUTES.create(":documentId"))
  async create(
    @Param("documentId") documentId: string,
    @Body() { text }: DocumentCommentCreateValidationDTO
  ): Promise<void> {
    // TODO get user id from auth
    await this.documentCommentsService.create(documentId, "userId", text);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a comment" })
  @ApiResponse({ status: 200 })
  @Patch(DOCUMENT_COMMENTS_ROUTES.update(":documentCommentId"))
  async update(
    @Param("documentCommentId") documentCommentId: string,
    @Body() { text }: DocumentCommentUpdateValidationDTO
  ): Promise<void> {
    await this.documentCommentsService.update(documentCommentId, text);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({ status: 200 })
  @Delete(DOCUMENT_COMMENTS_ROUTES.delete(":documentCommentId"))
  async delete(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.delete(documentCommentId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Restore a deleted comment" })
  @ApiResponse({ status: 200 })
  @Patch(DOCUMENT_COMMENTS_ROUTES.restore(":documentCommentId"))
  async restore(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.restore(documentCommentId);
  }
}
