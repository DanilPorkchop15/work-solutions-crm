import { CustomerPreviewResponseDTO } from "@backend/app/customer/customer.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-log/customer-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class CustomerLogResponseDTO implements CustomerLogDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => CustomerPreviewResponseDTO })
  customer: CustomerPreviewDTO;

  @ApiProperty({ type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty()
  created_at: string;
}
