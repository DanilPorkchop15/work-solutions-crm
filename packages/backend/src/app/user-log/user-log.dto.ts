import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

import { UserPreviewResponseDTO } from "../user/user.dto";

export class UserLogResponseDTO implements UserLogDTO {
  @ApiProperty({ description: "The unique identifier of the user log entry" })
  id: string;

  @ApiProperty({ description: "The action that was performed on the user (e.g. 'created', 'updated', 'deleted')" })
  action: string;

  @ApiProperty({ description: "A comment or description of the action that was performed" })
  comment: string;

  @ApiProperty({ description: "The user that the log entry refers to", type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty({ description: "The user that the log entry refers to", type: () => UserPreviewResponseDTO })
  affected_user: UserPreviewDTO;

  @ApiProperty({ description: "The date and time when the action was performed" })
  created_at: string;

  @ApiPropertyOptional({ description: "The date and time when the user log entry was deleted" })
  deleted_at?: string;
}
