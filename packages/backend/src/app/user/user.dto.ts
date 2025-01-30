import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Role, UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UserCreateValidationDTO implements UserCreateRequestDTO {
  @ApiPropertyOptional({
    description: "The avatar URL of the user",
    example: "https://example.com/avatar.jpg"
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe"
  })
  @IsString()
  @Length(1, 255)
  fullName: string;

  @ApiProperty({
    description: "The password of the user",
    example: "password123"
  })
  @IsString()
  @Length(8, 128)
  password: string;

  @ApiPropertyOptional({
    description: "The position of the user",
    example: "Manager"
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    description: "The role of the user",
    example: Role.USER
  })
  @IsEnum(Role)
  role: Role;
}

export class UserUpdateValidationDTO implements UserUpdateRequestDTO {
  @ApiPropertyOptional({
    description: "The avatar URL of the user",
    example: "https://example.com/avatar.jpg"
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: "The email of the user",
    example: "user@example.com"
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: "The full name of the user",
    example: "John Doe"
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  fullName?: string;

  @ApiPropertyOptional({
    description: "The position of the user",
    example: "Manager"
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    description: "The role of the user",
    example: Role.USER
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class UserResponseDTO implements UserDTO {
  @ApiProperty({
    description: "The ID of the user",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe"
  })
  full_name: string;

  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com"
  })
  email: string;

  @ApiPropertyOptional({
    description: "The position of the user",
    example: "Manager"
  })
  position?: string | undefined;

  @ApiPropertyOptional({
    description: "The avatar URL of the user",
    example: "https://example.com/avatar.jpg"
  })
  avatar_url?: string | undefined;

  @ApiProperty({
    description: "The role of the user",
    example: Role.USER
  })
  role: Role;

  @ApiProperty({
    description: "The date and time when the user was created",
    example: "2022-01-01T12:00:00.000Z"
  })
  created_at: string;

  @ApiProperty({
    description: "The date and time when the user was updated",
    example: "2022-01-01T12:00:00.000Z"
  })
  updated_at: string;
}

export class UserPreviewResponseDTO implements UserPreviewDTO {
  @ApiProperty({
    description: "The email of the user",
    example: "user@example.com"
  })
  email: string;

  @ApiPropertyOptional({
    description: "The position of the user",
    example: "Manager"
  })
  position?: string | undefined;

  @ApiProperty({
    description: "The ID of the user",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe"
  })
  full_name: string;

  @ApiPropertyOptional({
    description: "The avatar URL of the user",
    example: "https://example.com/avatar.jpg"
  })
  avatar_url?: string | undefined;
}
