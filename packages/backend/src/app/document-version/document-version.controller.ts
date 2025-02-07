import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentVersionResponseDTO } from "@backend/app/document-version/document-version.dto";
import { LogType } from "@backend/app/logger/logger.types";
import { CaslGuard } from "@backend/app/permission/casl.guard";
import { CheckPolicies } from "@backend/decorators/check-policies.decorator";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { Logger } from "@backend/decorators/logger.decorator";
import { User } from "@backend/models/entities/user.entity";
import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionApi
} from "@work-solutions-crm/libs/shared/document-version/document-version.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

import { LoggerService } from "../logger/logger.service";

import { DocumentVersionService } from "./document-version.service";

@ApiTags("Document Versions")
@ApiBearerAuth()
@Controller()
export class DocumentVersionController implements DocumentVersionApi {
  constructor(
    private readonly documentVersionsService: DocumentVersionService,
    private readonly loggerService: LoggerService
  ) {}

  @ApiOperation({ summary: "Get all document versions" })
  @ApiResponse({ status: 200, type: [DocumentVersionResponseDTO] })
  @ApiParam({ name: "documentId", required: true })
  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  @Logger("findAll", "document versions")
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }

  @Post(DOCUMENT_VERSIONS_ROUTES.upload(":documentId"))
  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.DOCUMENTS))
  async upload(
    @Param("documentId") documentId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
  ) {
    await this.documentVersionsService.upload(documentId, file, user);
    await this.loggerService.logByType(LogType.DOCUMENT, "uploaded", "document version", {
      document_id: documentId,
      user_id: user.user_id
    });
  }
}
