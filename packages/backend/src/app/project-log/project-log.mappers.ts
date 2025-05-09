import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";

import { ProjectLog } from "../../models/entities/project-log.entity";
import { mapProjectToPreviewDTO } from "../project/project.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapProjectLogToDTO(projectLog: ProjectLog): ProjectLogDTO {
  return {
    id: projectLog.project_log_id,
    action: projectLog.action,
    comment: projectLog.comment,
    user: mapUserToPreviewDTO(projectLog.user),
    project: mapProjectToPreviewDTO(projectLog.project),
    created_at: typeormDateToIsoString(projectLog.created_at),
    deleted_at: typeormNullableDateToIsoString(projectLog.deleted_at)
  };
}
