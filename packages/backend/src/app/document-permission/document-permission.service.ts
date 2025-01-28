import { DocumentPermission } from "@backend/models/entities/document-permission.entity";
import { Role } from "@backend/models/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DocumentPermissionService {
  constructor(
    @InjectRepository(DocumentPermission)
    private readonly documentPermissionRepository: Repository<DocumentPermission>
  ) {}

  async findAll(documentId: string): Promise<DocumentPermission[]> {
    return this.documentPermissionRepository.find({ where: { document: { document_id: documentId } } });
  }

  async create(documentId: string, role: Role): Promise<void> {
    const documentPermission: DocumentPermission = await this.documentPermissionRepository.save({
      document: { document_id: documentId },
      role
    });
    await this.documentPermissionRepository.save(documentPermission);
  }

  async delete(documentId: string): Promise<void> {
    await this.documentPermissionRepository.delete({ document: { document_id: documentId } });
  }
}
