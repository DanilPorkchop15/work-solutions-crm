import { DocumentCommentDTO } from "@work-solutions-crm/libs/shared/document-comments/document-comments.dto";

import { DocumentComment } from "../../models/entities/document-comment.entity";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapDocumentCommentToDTO(comment: DocumentComment): DocumentCommentDTO {
  return {
    id: comment.document_comment_id,
    user: mapUserToPreviewDTO(comment.user),
    text: comment.text,
    created_at: comment.created_at,
    updated_at: comment.updated_at
  };
}
