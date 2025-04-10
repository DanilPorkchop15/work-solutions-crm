import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { TaskCommentDTO } from "@work-solutions-crm/libs/shared/task-comment/task-comment.dto";

import { TaskComment } from "../../models/entities/task-comment.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapTaskCommentToDTO(taskComment: TaskComment): TaskCommentDTO {
  return {
    id: taskComment.task_comment_id,
    user: mapUserToPreviewDTO(taskComment.user),
    text: taskComment.text,
    created_at: typeormDateToIsoString(taskComment.created_at),
    updated_at: typeormDateToIsoString(taskComment.updated_at),
    deleted_at: typeormNullableDateToIsoString(taskComment.deleted_at)
  };
}
