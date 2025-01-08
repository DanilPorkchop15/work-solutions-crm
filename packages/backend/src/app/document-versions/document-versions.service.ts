import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-versions/document-versions.dto";
import { Repository } from "typeorm";

import { DocumentVersion } from "../../models/entities/document-version.entity";

import { mapDocumentVersionToDTO } from "./document-versions.mappers";

@Injectable()
export class DocumentVersionsService {
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
}
