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
    const documentPermissions: DocumentPermission[] = await this.documentPermissionRepository.find({
      where: { document: { document_id: documentId } }
    });

    const rolesToCheck: Role[] = [role, Role.ADMIN, Role.MODERATOR];

    if (documentPermissions.some(documentPermission => documentPermission.role in rolesToCheck)) {
      return;
    }

    await this.documentPermissionRepository.save({
      document: { document_id: documentId },
      role
    });
  }

  async delete(documentId: string): Promise<void> {
    await this.documentPermissionRepository.delete({ document: { document_id: documentId } });
  }
}
