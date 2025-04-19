import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import {
  DOCUMENT_COMMENTS_ROUTES,
  DocumentCommentApi
} from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comment/document-comment.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  DocumentCommentCreateValidationDTO,
  DocumentCommentResponseDTO,
  DocumentCommentUpdateValidationDTO
} from "./document-comment.dto";
import { DocumentCommentService } from "./document-comment.service";

@ApiTags("Document Comments")
@ApiBearerAuth()
@Controller()
export class DocumentCommentController implements DocumentCommentApi {
  constructor(
    private readonly documentCommentsService: DocumentCommentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Get all comments for a document" })
  @ApiResponse({ status: 200, type: [DocumentCommentResponseDTO] })
  @Get(DOCUMENT_COMMENTS_ROUTES.findAll(":documentId"))
  @Logger("findAll", "document comments")
  async findAll(@Param("documentId") documentId: string): Promise<DocumentCommentDTO[]> {
    return this.documentCommentsService.findAll(documentId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Create a new comment for a document" })
  @ApiResponse({ status: 201 })
  @Post(DOCUMENT_COMMENTS_ROUTES.create(":documentId"))
  async create(
    @Param("documentId") documentId: string,
    @Body() { text }: DocumentCommentCreateValidationDTO,
    @CurrentUser() user: User
  ): Promise<void> {
    await this.documentCommentsService.create(documentId, user.user_id, text);
    await this.loggerService.logByType(LogType.DOCUMENT, "прокомментировал", "Добавлен комментарий к документу", {
      document_id: documentId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
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

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Delete a comment" })
  @ApiResponse({ status: 200 })
  @Delete(DOCUMENT_COMMENTS_ROUTES.delete(":documentCommentId"))
  @Logger("delete", "document comment")
  async delete(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.delete(documentCommentId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Restore a deleted comment" })
  @ApiResponse({ status: 200 })
  @Patch(DOCUMENT_COMMENTS_ROUTES.restore(":documentCommentId"))
  async restore(@Param("documentCommentId") documentCommentId: string): Promise<void> {
    await this.documentCommentsService.restore(documentCommentId);
  }
}
