import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";

import { typeormDateToIsoString, typeormNullableDateToIsoString } from "../../common/typeorm-date-to-iso-string";
import { Document } from "../../models/entities/document.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapDocumentToDTO(document: Document): DocumentDTO {
  return {
    id: document.document_id,
    name: document.name,
    description: document.description,
    user_created: mapUserToPreviewDTO(document.user_created),
    created_at: typeormDateToIsoString(document.created_at),
    roles: document.document_permissions.map(permission => permission.role),
    updated_at: typeormDateToIsoString(document.updated_at),
    deleted_at: typeormNullableDateToIsoString(document.deleted_at)
  };
}

export function mapDocumentToPreviewDTO(document: Document): DocumentPreviewDTO {
  return {
    id: document.document_id,
    name: document.name,
    user_created: mapUserToPreviewDTO(document.user_created),
    created_at: typeormDateToIsoString(document.created_at),
    updated_at: typeormDateToIsoString(document.updated_at),
    deleted_at: typeormNullableDateToIsoString(document.deleted_at)
  };
}
