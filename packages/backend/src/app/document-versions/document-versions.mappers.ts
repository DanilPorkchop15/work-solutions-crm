import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-versions/document-versions.dto";

import { DocumentVersion } from "../../models/entities/document-version.entity";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapDocumentVersionToDTO(documentVersion: DocumentVersion): DocumentVersionDTO {
  return {
    id: documentVersion.document_version_id,
    document_url: documentVersion.document_url,
    version: documentVersion.version,
    user_created: mapUserToPreviewDTO(documentVersion.user_created),
    createdAt: documentVersion.created_at,
    updatedAt: documentVersion.updated_at
  };
}
