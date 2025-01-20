import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comment/document-comment.dto";
import { Repository } from "typeorm";

import { DocumentComment } from "../../models/entities/document-comment.entity";

import { mapDocumentCommentToDTO } from "./document-comment.mappers";

@Injectable()
export class DocumentCommentService {
  constructor(
    @InjectRepository(DocumentComment)
    private readonly documentCommentRepository: Repository<DocumentComment>
  ) {}

  async findAll(documentId: string): Promise<DocumentCommentDTO[]> {
    const comments: DocumentComment[] = await this.documentCommentRepository.find({
      where: { document: { document_id: documentId } },
      relations: ["user", "document"],
      order: { created_at: "ASC" }
    });
    return comments.map(mapDocumentCommentToDTO);
  }

  async create(documentId: string, userId: string, text: string): Promise<void> {
    const comment: DocumentComment = this.documentCommentRepository.create({
      document: { document_id: documentId },
      user: { user_id: userId },
      text
    });
    await this.documentCommentRepository.save(comment);
  }

  async update(commentId: string, text: string): Promise<void> {
    await this.documentCommentRepository.update(commentId, { text });
  }

  async delete(commentId: string): Promise<void> {
    await this.documentCommentRepository.softDelete(commentId);
  }

  async restore(commentId: string): Promise<void> {
    await this.documentCommentRepository.restore(commentId);
  }
}
