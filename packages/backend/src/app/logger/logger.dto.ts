import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LogDTO } from "@work-solutions-crm/libs/shared/logger/logger.dto";

import { UserPreviewResponseDTO } from "../user/user.dto";

export class LogResponseDTO implements LogDTO {
  @ApiProperty({ description: "The action that was performed (e.g. 'created', 'updated', 'deleted')" })
  action: string;

  @ApiProperty({ description: "A comment or description of the action that was performed" })
  comment: string;

  @ApiProperty({ description: "The date and time when the action was performed" })
  created_at: string;

  @ApiPropertyOptional({ description: "The date and time when the log entry was deleted" })
  deleted_at?: string;

  @ApiProperty({ description: "The unique identifier of the log entry" })
  id: string;

  @ApiProperty({ description: "The type of the log entry" })
  type: string;

  @ApiProperty({ description: "The user who performed the action", type: () => UserPreviewResponseDTO })
  user: UserPreviewResponseDTO;
}
