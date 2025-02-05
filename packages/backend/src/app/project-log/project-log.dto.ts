import { ProjectPreviewResponseDTO } from "@backend/app/project/project.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";
import { ProjectLogDTO } from "@work-solutions-crm/libs/shared/project-log/project-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class ProjectLogResponseDTO implements ProjectLogDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => ProjectPreviewResponseDTO })
  project: ProjectPreviewDTO;

  @ApiProperty({ type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty()
  created_at: string;
}
