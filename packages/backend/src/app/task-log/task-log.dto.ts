import { TaskPreviewResponseDTO } from "@backend/app/task/task.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-log/task-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class TaskLogResponseDTO implements TaskLogDTO {
  @ApiProperty({
    description: "The unique identifier of the task log entry",
    example: "a1b2c3d4",
    type: String
  })
  id: string;

  @ApiProperty({
    description: "The action that was performed (e.g. 'created', 'updated', 'deleted')",
    example: "created",
    type: String
  })
  action: string;

  @ApiProperty({
    description: "A comment or description of the action that was performed",
    example: "Task created",
    type: String
  })
  comment: string;

  @ApiProperty({
    description: "The task that the log entry refers to",
    type: () => TaskPreviewResponseDTO
  })
  task: TaskPreviewDTO;

  @ApiProperty({
    description: "The user who performed the action",
    type: () => UserPreviewResponseDTO
  })
  user: UserPreviewDTO;

  @ApiProperty({
    description: "The date and time when the action was performed",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  created_at: string;

  @ApiProperty({
    description: "The date and time when the task log entry was deleted",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  deleted_at?: string;
}
