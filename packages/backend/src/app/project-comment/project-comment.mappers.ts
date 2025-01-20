import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";

import { ProjectComment } from "../../models/entities/project-comment.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapProjectCommentToDTO(projectComment: ProjectComment): ProjectCommentDTO {
  return {
    id: projectComment.project_comment_id,
    user: mapUserToPreviewDTO(projectComment.user),
    text: projectComment.text,
    created_at: projectComment.created_at,
    updated_at: projectComment.updated_at
  };
}
