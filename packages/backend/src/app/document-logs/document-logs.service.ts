import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-logs/document-logs.dto";
import { Repository } from "typeorm";

import { DocumentLog } from "../../models/entities/document-log.entity";

import { mapDocumentLogToDTO } from "./document-logs.mappers";

@Injectable()
export class DocumentLogsService {
  constructor(
    @InjectRepository(DocumentLog)
    private readonly documentLogRepository: Repository<DocumentLog>
  ) {}

  async findAll(documentId: string): Promise<DocumentLogDTO[]> {
    const documentLogs: DocumentLog[] = await this.documentLogRepository.find({
      where: { document: { document_id: documentId } },
      relations: ["user", "document"],
      order: { created_at: "ASC" }
    });
    return documentLogs.map(mapDocumentLogToDTO);
  }
}
