import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

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
