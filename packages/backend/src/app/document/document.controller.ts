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
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { DocumentApi, DOCUMENTS_ROUTES } from "@work-solutions-crm/libs/shared/document/document.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { DocumentPermissionGuard } from "../document-permission/document-permission.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  DocumentBulkDeleteValidationDTO,
  DocumentBulkRestoreValidationDTO,
  DocumentCreateValidationDTO,
  DocumentPreviewResponseDTO,
  DocumentResponseDTO,
  DocumentUpdateValidationDTO
} from "./document.dto";
import { DocumentService } from "./document.service";

@ApiTags("Documents")
@ApiBearerAuth()
@Controller()
export class DocumentController implements DocumentApi {
  constructor(
    private readonly documentsService: DocumentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @Get(DOCUMENTS_ROUTES.findAll())
  @ApiOperation({ summary: "Get all documents" })
  @ApiResponse({ status: 200, type: [DocumentPreviewResponseDTO] })
  @Logger("findAll", "Documents")
  async findAll(@CurrentUser() user: User): Promise<DocumentPreviewDTO[]> {
    return this.documentsService.findAll(user);
  }

  @Get(DOCUMENTS_ROUTES.findOne(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Get document by id" })
  @ApiOkResponse({ type: DocumentResponseDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  @Logger("findOne", "Document")
  async findOne(@Param("documentId") documentId: string): Promise<DocumentDTO> {
    return this.documentsService.findOne(documentId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.CREATE, Subject.DOCUMENTS))
  @Post(DOCUMENTS_ROUTES.create())
  @ApiOperation({ summary: "Create document" })
  @ApiCreatedResponse({ type: DocumentResponseDTO })
  async create(@Body() dto: DocumentCreateValidationDTO, @CurrentUser() user: User): Promise<DocumentDTO> {
    const documentDto: DocumentDTO = await this.documentsService.create(dto, user);
    await this.loggerService.logByType(LogType.DOCUMENT, "создан", `Создан новый документ (${documentDto.id})`, {
      document_id: documentDto.id,
      user_id: user.user_id
    });
    return documentDto;
  }

  @Delete(DOCUMENTS_ROUTES.bulkDelete())
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Bulk delete documents" })
  @ApiBody({ type: DocumentBulkDeleteValidationDTO })
  @ApiResponse({ status: 200 })
  async bulkDelete(@Body() documentIds: DocumentBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.documentsService.bulkDelete(documentIds);
    for (const documentId of documentIds.document_ids) {
      await this.loggerService.logByType(
        LogType.DOCUMENT,
        "массово удален",
        `Документ был удален в ходе массового удаления (${documentId})`,
        {
          document_id: documentId,
          user_id: user.user_id
        }
      );
    }
  }

  @Patch(DOCUMENTS_ROUTES.bulkRestore())
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Bulk restore documents" })
  @ApiBody({ type: DocumentBulkRestoreValidationDTO })
  @ApiResponse({ status: 200 })
  async bulkRestore(@Body() documentIds: DocumentBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.documentsService.bulkRestore(documentIds);
    for (const documentId of documentIds.document_ids) {
      await this.loggerService.logByType(
        LogType.DOCUMENT,
        "массово восстановлен",
        `Документ был восстановлен в ходе массового восстановления (${documentId})`,
        {
          document_id: documentId,
          user_id: user.user_id
        }
      );
    }
  }

  @UseGuards(AuthGuard, CaslGuard, DocumentPermissionGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.DOCUMENTS))
  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  @ApiOperation({ summary: "Delete document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async delete(@Param("documentId") documentId: string, @CurrentUser() user: User): Promise<void> {
    await this.documentsService.delete(documentId);
    await this.loggerService.logByType(LogType.DOCUMENT, "удален", `Документ был удален (${documentId})`, {
      document_id: documentId,
      user_id: user.user_id
    });
  }

  @Patch(DOCUMENTS_ROUTES.restore(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Restore document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async restore(@Param("documentId") documentId: string, @CurrentUser() user: User): Promise<void> {
    await this.documentsService.restore(documentId);
    await this.loggerService.logByType(LogType.DOCUMENT, "восстановлен", `Документ был восстановлен (${documentId})`, {
      document_id: documentId,
      user_id: user.user_id
    });
  }

  @Patch(DOCUMENTS_ROUTES.update(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.DOCUMENTS))
  @ApiOperation({ summary: "Update document" })
  @ApiOkResponse({ type: DocumentResponseDTO })
  @ApiNotFoundResponse({ description: "Document not found" })
  async update(
    @Param("documentId") documentId: string,
    @Body() dto: DocumentUpdateValidationDTO,
    @CurrentUser() user: User
  ): Promise<DocumentDTO> {
    const documentDto: DocumentDTO = await this.documentsService.update(documentId, dto);
    await this.loggerService.logByType(LogType.DOCUMENT, "обновлен", `Документ был обновлен (${documentId})`, {
      document_id: documentId,
      user_id: user.user_id
    });
    return documentDto;
  }
}
