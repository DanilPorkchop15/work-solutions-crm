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
import { LogType } from "@backend/app/logger/logger.types";
import { CaslGuard } from "@backend/app/permission/casl.guard";
import { CheckPolicies } from "@backend/decorators/check-policies.decorator";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { Logger } from "@backend/decorators/logger.decorator";
import { User } from "@backend/models/entities/user.entity";
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

import { LoggerService } from "../logger/logger.service";

import { DocumentService } from "./document.service";

@ApiTags("Documents")
@ApiBearerAuth()
@Controller()
export class DocumentController implements DocumentApi {
  constructor(
    private readonly documentsService: DocumentService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard, DocumentPermissionGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @Get(DOCUMENTS_ROUTES.findAll())
  @ApiOperation({ summary: "Get all documents" })
  @ApiResponse({ status: 200, type: [DocumentPreviewResponseDTO] })
  @Logger("findAll", "Documents")
  async findAll(): Promise<DocumentPreviewDTO[]> {
    return this.documentsService.findAll();
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
    const documentDto: DocumentDTO = await this.documentsService.create(dto);
    await this.loggerService.logByType(LogType.DOCUMENT, "created", "document", {
      document_id: documentDto.id,
      user_id: user.user_id
    });
    return documentDto;
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
    await this.loggerService.logByType(LogType.DOCUMENT, "updated", "document", {
      document_id: documentId,
      user_id: user.user_id
    });
    return documentDto;
  }

  @UseGuards(AuthGuard, CaslGuard, DocumentPermissionGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.DOCUMENTS))
  @Delete(DOCUMENTS_ROUTES.delete(":documentId"))
  @ApiOperation({ summary: "Delete document" })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: "Document not found" })
  async delete(@Param("documentId") documentId: string, @CurrentUser() user: User): Promise<void> {
    await this.documentsService.delete(documentId);
    await this.loggerService.logByType(LogType.DOCUMENT, "deleted", "document", {
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
    await this.loggerService.logByType(LogType.DOCUMENT, "restored", "document", {
      document_id: documentId,
      user_id: user.user_id
    });
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
      await this.loggerService.logByType(LogType.DOCUMENT, "bulk deleted", "documents", {
        document_id: documentId,
        user_id: user.user_id
      });
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
      await this.loggerService.logByType(LogType.DOCUMENT, "bulk restored", "documents", {
        document_id: documentId,
        user_id: user.user_id
      });
    }
  }
}
