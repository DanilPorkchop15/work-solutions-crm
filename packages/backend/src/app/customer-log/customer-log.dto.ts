import { CustomerPreviewResponseDTO } from "@backend/app/customer/customer.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-log/customer-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class CustomerLogResponseDTO implements CustomerLogDTO {
  @ApiProperty({
    description: "The ID of customer log",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
    type: String
  })
  id: string;

  @ApiProperty({
    description: "The action of customer log",
    example: "CREATE",
    type: String
  })
  action: string;

  @ApiProperty({
    description: "The comment of customer log",
    example: "Created customer",
    type: String
  })
  comment: string;

  @ApiProperty({
    description: "The customer of customer log",
    example: {
      id: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
      name: "John Doe",
      email: "user@example.com"
    },
    type: () => CustomerPreviewResponseDTO
  })
  customer: CustomerPreviewDTO;

  @ApiProperty({
    description: "The user who created the customer log",
    example: {
      id: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
      name: "John Doe",
      email: "user@example.com"
    },
    type: () => UserPreviewResponseDTO
  })
  user: UserPreviewDTO;

  @ApiProperty({
    description: "The date and time when the customer log was created",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  created_at: string;

  @ApiProperty({
    description: "The date and time when the customer log was deleted",
    example: "2022-01-01T12:00:00.000Z",
    type: String,
    required: false
  })
  deleted_at?: string;
}
