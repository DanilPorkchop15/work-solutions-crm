import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comment/document-comment.dto";

import { DocumentComment } from "../../models/entities/document-comment.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapDocumentCommentToDTO(comment: DocumentComment): DocumentCommentDTO {
  return {
    id: comment.document_comment_id,
    user: mapUserToPreviewDTO(comment.user),
    text: comment.text,
    created_at: typeormDateToIsoString(comment.created_at),
    updated_at: typeormDateToIsoString(comment.updated_at),
    deleted_at: typeormNullableDateToIsoString(comment.deleted_at)
  };
}
