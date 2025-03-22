import { ProjectPreviewResponseDTO } from "@backend/app/project/project.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class ProjectLogResponseDTO implements ProjectLogDTO {
  @ApiProperty({
    description: "The unique identifier of the project log entry",
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
    example: "Project created",
    type: String
  })
  comment: string;

  @ApiProperty({
    description: "The project that the log entry refers to",
    type: () => ProjectPreviewResponseDTO
  })
  project: ProjectPreviewDTO;

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
    description: "The date and time when the project log entry was deleted",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  deleted_at?: string;
}
