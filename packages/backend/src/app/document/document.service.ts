import { Role, User } from "@backend/models/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DocumentBulkDeleteRequestDTO,
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";
import { Repository } from "typeorm";

import { Document } from "../../models/entities/document.entity";
import { DocumentPermissionService } from "../document-permission/document-permission.service";

import { mapDocumentToDTO, mapDocumentToPreviewDTO } from "./document.mappers";

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly documentPermissionService: DocumentPermissionService
  ) {}

  async findAll(user: User): Promise<DocumentPreviewDTO[]> {
    const documents: Document[] = await this.documentRepository.find({
      relations: {
        user_created: true,
        document_permissions: true
      },
      order: { created_at: "ASC" },
      withDeleted: true
    });

    if (user.role !== Role.ADMIN && user.role !== Role.MODERATOR)
      return documents
        .filter(
          document =>
            document.document_permissions.some(documentPermission => documentPermission.role === user.role) ||
            user.user_id === document.user_created.user_id
        )
        .map(mapDocumentToPreviewDTO);

    return documents.map(mapDocumentToPreviewDTO);
  }

  async findOne(documentId: string): Promise<DocumentDTO> {
    const document: Document | null = await this.documentRepository.findOne({
      where: { document_id: documentId },
      relations: {
        user_created: true,
        document_permissions: true
      },
      withDeleted: true
    });
    if (!document) {
      throw new Error("Document not found");
    }
    return mapDocumentToDTO(document);
  }

  async create({ roles, ...dto }: DocumentCreateRequestDTO, user: User): Promise<DocumentDTO> {
    const document: Document = await this.documentRepository.save({
      ...dto,
      user_created: { user_id: user.user_id },
      document_permissions: roles.map(role => ({ role }))
    });

    return this.findOne(document.document_id);
  }

  async update(documentId: string, { roles, ...dto }: DocumentUpdateRequestDTO): Promise<DocumentDTO> {
    await this.documentRepository.update(documentId, dto);

    if (roles) {
      await this.documentPermissionService.delete(documentId);
      for (const role of roles) {
        await this.documentPermissionService.create(documentId, role);
      }
    }

    const updatedDocument: DocumentDTO = await this.findOne(documentId);
    if (!updatedDocument) {
      throw new Error("Document not found");
    }
    return updatedDocument;
  }

  async delete(documentId: string): Promise<void> {
    await this.documentRepository.softDelete(documentId);
  }

  async restore(documentId: string): Promise<void> {
    await this.documentRepository.restore(documentId);
  }

  async bulkDelete(dto: DocumentBulkDeleteRequestDTO): Promise<void> {
    await this.documentRepository.softDelete(dto.document_ids);
  }

  async bulkRestore(dto: DocumentBulkDeleteRequestDTO): Promise<void> {
    await this.documentRepository.restore(dto.document_ids);
  }
}
