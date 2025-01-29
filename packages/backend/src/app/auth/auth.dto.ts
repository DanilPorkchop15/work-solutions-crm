import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

export class LoginValidationDTO implements LoginRequestDTO {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
    format: "email",
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password123",
    description: "The password of the user",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
