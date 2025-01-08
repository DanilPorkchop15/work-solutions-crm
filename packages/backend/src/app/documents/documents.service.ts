import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/documents/documents.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/documents/documents.dto";
import { Repository } from "typeorm";

import { Document } from "../../models/entities/document.entity";

import { mapDocumentToDTO, mapDocumentToPreviewDTO } from "./documents.mappers";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>
  ) {}

  async findAll(): Promise<DocumentPreviewDTO[]> {
    const documents: Document[] = await this.documentRepository.find({
      relations: ["user_created"],
      order: { created_at: "ASC" }
    });
    return documents.map(mapDocumentToPreviewDTO);
  }

  async findOne(documentId: string): Promise<DocumentDTO> {
    const document: Document | null = await this.documentRepository.findOne({
      where: { document_id: documentId },
      relations: ["user_created"]
    });
    if (!document) {
      throw new Error("Document not found");
    }
    return mapDocumentToDTO(document);
  }

  async create(dto: DocumentCreateRequestDTO): Promise<DocumentDTO> {
    const document: Document = this.documentRepository.create(dto);
    await this.documentRepository.save(document);
    return mapDocumentToDTO(document);
  }

  async update(documentId: string, dto: DocumentUpdateRequestDTO): Promise<DocumentDTO> {
    await this.documentRepository.update(documentId, dto);
    const updatedDocument: Document | null = await this.documentRepository.findOne({
      where: { document_id: documentId },
      relations: ["user_created"]
    });
    if (!updatedDocument) {
      throw new Error("Document not found");
    }
    return mapDocumentToDTO(updatedDocument);
  }

  async delete(documentId: string): Promise<void> {
    await this.documentRepository.softDelete(documentId);
  }

  async restore(documentId: string): Promise<void> {
    await this.documentRepository.restore(documentId);
  }
}
