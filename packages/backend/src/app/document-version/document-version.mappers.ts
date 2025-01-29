import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

import { DocumentVersion } from "../../models/entities/document-version.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapDocumentVersionToDTO(documentVersion: DocumentVersion): DocumentVersionDTO {
  return {
    id: documentVersion.document_version_id,
    document_url: documentVersion.document_url,
    version: documentVersion.version,
    user_created: mapUserToPreviewDTO(documentVersion.user_created),
    created_at: documentVersion.created_at.toISOString(),
    updated_at: documentVersion.updated_at.toISOString()
  };
}
