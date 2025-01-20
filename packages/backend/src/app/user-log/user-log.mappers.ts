import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

import { UserLog } from "../../models/entities/user-log.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapUserLogToDTO(userLog: UserLog): UserLogDTO {
  return {
    id: userLog.user_log_id,
    action: userLog.action,
    comment: userLog.comment ?? "",
    user: mapUserToPreviewDTO(userLog.user),
    created_at: userLog.created_at
  };
}
