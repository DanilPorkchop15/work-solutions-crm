import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";

import { DocumentLog } from "../../models/entities/document-log.entity";
import { mapDocumentToPreviewDTO } from "../document/document.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapDocumentLogToDTO(documentLog: DocumentLog): DocumentLogDTO {
  return {
    id: documentLog.document_log_id,
    action: documentLog.action,
    comment: documentLog.comment ?? "",
    user: mapUserToPreviewDTO(documentLog.user),
    document: mapDocumentToPreviewDTO(documentLog.document),
    created_at: typeormDateToIsoString(documentLog.created_at),
    deleted_at: typeormNullableDateToIsoString(documentLog.deleted_at)
  };
}
