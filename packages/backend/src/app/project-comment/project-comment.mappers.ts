import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";

import { ProjectComment } from "../../models/entities/project-comment.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapProjectCommentToDTO(projectComment: ProjectComment): ProjectCommentDTO {
  return {
    id: projectComment.project_comment_id,
    user: mapUserToPreviewDTO(projectComment.user),
    text: projectComment.text,
    created_at: typeormDateToIsoString(projectComment.created_at),
    updated_at: typeormDateToIsoString(projectComment.updated_at),
    deleted_at: typeormNullableDateToIsoString(projectComment.deleted_at)
  };
}
