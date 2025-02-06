import { AuthGuard } from "@backend/app/auth/auth.guard";
import { DocumentPermissionGuard } from "@backend/app/document-permission/document-permission.guard";
import { DocumentVersionResponseDTO } from "@backend/app/document-version/document-version.dto";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { User } from "@backend/models/entities/user.entity";
import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  DOCUMENT_VERSIONS_ROUTES,
  DocumentVersionApi
} from "@work-solutions-crm/libs/shared/document-version/document-version.api";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

import { DocumentVersionService } from "./document-version.service";

@ApiTags("Document Versions")
@ApiBearerAuth()
@Controller()
export class DocumentVersionController implements DocumentVersionApi {
  constructor(private readonly documentVersionsService: DocumentVersionService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all document versions" })
  @ApiResponse({ status: 200, type: [DocumentVersionResponseDTO] })
  @ApiParam({ name: "documentId", required: true })
  @Get(DOCUMENT_VERSIONS_ROUTES.findAll(":documentId"))
  @UseGuards(AuthGuard, DocumentPermissionGuard)
  async findAll(@Param("documentId") documentId: string): Promise<DocumentVersionDTO[]> {
    return this.documentVersionsService.findAll(documentId);
  }

  @Post(DOCUMENT_VERSIONS_ROUTES.upload(":documentId"))
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @Param("documentId") documentId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
  ) {
    await this.documentVersionsService.upload(documentId, file, user);
  }
}
