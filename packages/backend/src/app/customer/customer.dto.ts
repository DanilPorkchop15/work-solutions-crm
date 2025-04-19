import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CustomerBulkDeleteRequestDTO,
  CustomerBulkRestoreRequestDTO,
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

import { UserPreviewResponseDTO } from "../user/user.dto";

export class CustomerCreateValidationDTO implements CustomerCreateRequestDTO {
  @ApiProperty({
    description: "The email of customer",
    example: "example@domain.com"
  })
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: "The INN of customer",
    example: "1234567890"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 12)
  inn?: string;

  @ApiProperty({
    description: "The name of customer",
    example: "John Doe"
  })
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiPropertyOptional({
    description: "The phone number of customer",
    example: "+7 (123) 456-78-90"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  phone?: string;

  @ApiPropertyOptional({
    description: "The website of customer",
    example: "https://example.com"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  website?: string;
}

export class CustomerUpdateValidationDTO implements CustomerUpdateRequestDTO {
  @ApiPropertyOptional({
    description: "The email of customer",
    example: "example@domain.com"
  })
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "The INN of customer",
    example: "1234567890"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 12)
  inn?: string;

  @ApiPropertyOptional({
    description: "The name of customer",
    example: "John Doe"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiPropertyOptional({
    description: "The phone number of customer",
    example: "+7 (123) 456-78-90"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  phone?: string;

  @ApiPropertyOptional({
    description: "The website of customer",
    example: "https://example.com"
  })
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  website?: string;
}

export class CustomerResponseDTO implements CustomerDTO {
  @ApiProperty({
    description: "The ID of customer",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The name of customer",
    example: "John Doe"
  })
  name: string;

  @ApiPropertyOptional({
    description: "The email of customer",
    example: "user@example.com"
  })
  email?: string | undefined;

  @ApiPropertyOptional({
    description: "The phone number of customer",
    example: "+7 (123) 456-78-90"
  })
  phone?: string | undefined;

  @ApiPropertyOptional({
    description: "The INN of customer",
    example: "1234567890"
  })
  inn?: string | undefined;

  @ApiPropertyOptional({
    description: "The website of customer",
    example: "https://example.com"
  })
  website?: string | undefined;

  @ApiProperty({
    description: "The user who created the customer",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The date and time when the customer was created",
    example: "2022-01-01T12:00:00.000Z"
  })
  created_at: string;

  @ApiProperty({
    description: "The date and time when the customer was updated",
    example: "2022-01-01T12:00:00.000Z"
  })
  updated_at: string;

  @ApiProperty({
    description: "The date and time when the customer was deleted",
    example: "2022-01-01T12:00:00.000Z"
  })
  deleted_at?: string | undefined;
}

export class CustomerPreviewResponseDTO implements CustomerPreviewDTO {
  @ApiProperty({
    description: "The name of the customer",
    example: "John Doe"
  })
  name: string;

  @ApiPropertyOptional({
    description: "The email of the customer",
    example: "user@example.com"
  })
  email?: string | undefined;

  @ApiProperty({
    description: "The ID of the customer",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The user who created the customer",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiPropertyOptional({
    description: "The date and time when the customer was deleted",
    example: "2022-01-01T12:00:00.000Z"
  })
  deleted_at?: string | undefined;

  @ApiProperty({
    description: "The date and time when the customer was created",
    example: "2022-01-01T12:00:00.000Z"
  })
  created_at: string;

  @ApiPropertyOptional({
    description: "The date and time when the customer was updated",
    example: "2022-01-01T12:00:00.000Z"
  })
  updated_at: string;
}

export class CustomerBulkDeleteValidationDTO implements CustomerBulkDeleteRequestDTO {
  @ApiProperty({
    description: "The IDs of customers to delete",
    example: ["c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1", "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a2"],
    required: true
  })
  readonly customer_ids: string[];
}

export class CustomerBulkRestoreValidationDTO implements CustomerBulkRestoreRequestDTO {
  @ApiProperty({
    description: "The IDs of customers to restore",
    example: ["c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1", "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a2"],
    required: true
  })
  readonly customer_ids: string[];
}
