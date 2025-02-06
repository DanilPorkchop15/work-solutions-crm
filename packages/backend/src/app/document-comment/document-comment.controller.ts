import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  DocumentCommentCreateValidationDTO,
  DocumentCommentResponseDTO,
  DocumentCommentUpdateValidationDTO
} from "@backend/app/document-comment/document-comment.dto";
import { LoggerService } from "@backend/app/logger/logger.service";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { Logger } from "@backend/decorators/logger.decorator";
import { User } from "@backend/models/entities/user.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  DOCUMENT_COMMENTS_ROUTES,
  DocumentCommentApi
} from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comment/document-comment.dto";

import { LogType } from "../logger/logger.types";

import { DocumentCommentService } from "./document-comment.service";

@ApiTags("Document Comments")
@ApiBearerAuth()
@Controller()
export class DocumentCommentController implements DocumentCommentApi {
  constructor(
    private readonly documentCommentsService: DocumentCommentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all comments for a document" })
  @ApiResponse({ status: 200, type: [DocumentCommentResponseDTO] })
  @Get(DOCUMENT_COMMENTS_ROUTES.findAll(":documentId"))
  @Logger("findAll", "document comments")
  async findAll(@Param("documentId") documentId: string): Promise<DocumentCommentDTO[]> {
    return this.documentCommentsService.findAll(documentId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create a new comment for a document" })
  @ApiResponse({ status: 201 })
  @Post(DOCUMENT_COMMENTS_ROUTES.create(":documentId"))
  async create(
    @Param("documentId") documentId: string,
    @Body() { text }: DocumentCommentCreateValidationDTO,
    @CurrentUser() user: User
  ): Promise<void> {
    await this.documentCommentsService.create(documentId, user.user_id, text);
    await this.loggerService.logByType(LogType.DOCUMENT, "commented", "document", {
      document_id: documentId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a comment" })
  @ApiResponse({ status: 200 })
  @Patch(DOCUMENT_COMMENTS_ROUTES.update(":documentCommentId"))
  @Logger("update", "document comment")
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
  @Logger("delete", "document comment")
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
