import { TaskPreviewResponseDTO } from "@backend/app/task/task.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";
import { TaskLogDTO } from "@work-solutions-crm/libs/shared/task-log/task-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class TaskLogResponseDTO implements TaskLogDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => TaskPreviewResponseDTO })
  task: TaskPreviewDTO;

  @ApiProperty({ type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty()
  created_at: string;
}
