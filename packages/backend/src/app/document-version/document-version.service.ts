import { User } from "@backend/models/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";
import { toNumber } from "lodash";
import { Repository } from "typeorm";

import { DocumentVersion } from "../../models/entities/document-version.entity";

import { mapDocumentVersionToDTO } from "./document-version.mappers";

@Injectable()
export class DocumentVersionService {
  constructor(
    @InjectRepository(DocumentVersion)
    private readonly documentVersionRepository: Repository<DocumentVersion>
  ) {}

  async findAll(documentId: string): Promise<DocumentVersionDTO[]> {
    const documentVersions: DocumentVersion[] = await this.documentVersionRepository.find({
      where: { document: { document_id: documentId } },
      relations: ["user_created"],
      order: { created_at: "ASC" }
    });
    return documentVersions.map(mapDocumentVersionToDTO);
  }

  async upload(documentId: string, file: Express.Multer.File, user: User) {
    const lastVersion: DocumentVersion | null = await this.documentVersionRepository.findOne({
      where: { document: { document_id: documentId } },
      relations: {
        document: true
      },
      order: { version: "DESC" }
    });

    await this.documentVersionRepository.save({
      document: {
        document_id: documentId
      },
      document_url: file.path,
      version: lastVersion ? toNumber(lastVersion.version) + 1 : 1,
      user_created: user
    });
  }
}
