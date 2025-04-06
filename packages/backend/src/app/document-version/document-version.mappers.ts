import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";
import { toNumber } from "lodash";

import { DocumentVersion } from "../../models/entities/document-version.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapDocumentVersionToDTO(documentVersion: DocumentVersion): DocumentVersionDTO {
  return {
    id: documentVersion.document_version_id,
    document_url: documentVersion.document_url,
    version: toNumber(documentVersion.version),
    user_created: mapUserToPreviewDTO(documentVersion.user_created),
    created_at: typeormDateToIsoString(documentVersion.created_at),
    updated_at: typeormDateToIsoString(documentVersion.updated_at),
    deleted_at: typeormNullableDateToIsoString(documentVersion.deleted_at)
  };
}
