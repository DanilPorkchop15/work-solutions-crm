import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";

export class UserLogResponseDTO implements UserLogDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty()
  created_at: string;
}
