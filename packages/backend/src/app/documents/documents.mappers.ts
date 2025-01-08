import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/documents/documents.dto";

import { Document } from "../../models/entities/document.entity";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapDocumentToDTO(document: Document): DocumentDTO {
  return {
    id: document.document_id,
    name: document.name,
    description: document.description,
    user_created: mapUserToPreviewDTO(document.user_created),
    createdAt: document.created_at,
    updatedAt: document.updated_at
  };
}

export function mapDocumentToPreviewDTO(document: Document): DocumentPreviewDTO {
  return {
    id: document.document_id,
    name: document.name,
    user_created: mapUserToPreviewDTO(document.user_created),
    createdAt: document.created_at,
    updatedAt: document.updated_at
  };
}
