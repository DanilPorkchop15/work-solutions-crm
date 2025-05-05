import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import {
  Action,
  LoginDTO,
  PermissionDTO,
  Subject,
  TokenDTO,
  UserWithPermissionsDTO
} from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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

export class TokenResponseDTO implements TokenDTO {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3YjUzMmQxZjJkMmE2MjIzYTNhMjEiLCJpYXQiOjE2NTQ3NzY2NjAsImV4cCI6MTY1NDc3NzI2MH0.OTI4YjIyYmI4NzU3MzM3MzgwNmU3MjQ2M2E4OWYyZjUxNDM1YzUxNjliNGU1YmY4MjRhYjUwMjcxNjU3MzA",
    description: "The access token that can be used to access protected routes"
  })
  access_token: string;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3YjUzMmQxZjJkMmE2MjIzYTNhMjEiLCJpYXQiOjE2NTQ3NzY2NjAsImV4cCI6MTY1NDc4Mzg2MH0.ODliODUyZjU5MzE2YjM1YjY4MzU3OWM3NWI2ZjM0NjYzYzFlZDQxMjM1NmQ4ZjM3MjQxNjZjYzQ3MjE4YjY",
    description: "The refresh token that can be used to obtain a new access token when the previous one expires"
  })
  refreshToken: string;
}

export class PermissionResponseDTO implements PermissionDTO {
  @ApiProperty({
    example: [Subject.USERS],
    description: "The subject(s) that the permission applies to",
    required: true
  })
  subject: Subject | Subject[];

  @ApiProperty({
    example: [Action.CREATE],
    description: "The action(s) that the permission grants",
    required: true
  })
  action: Action | Action[];

  @ApiPropertyOptional({
    description: "The conditions that the permission is subject to",
    required: false
  })
  conditions?: unknown;

  @ApiPropertyOptional({
    description: "Whether the permission is inverted (i.e. whether it denies the action on the subject)",
    required: false
  })
  inverted?: boolean | undefined;
}

export class UserWithPermissionsResponseDTO implements UserWithPermissionsDTO {
  @ApiProperty({
    example: [
      {
        subject: Subject.USERS,
        action: Action.CREATE,
        conditions: null,
        inverted: false
      }
    ],
    description: "The permissions that the user has",
    required: true
  })
  permissions: PermissionDTO[];

  @ApiProperty({
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
    description: "The ID of the user",
    required: true
  })
  id: string;

  @ApiProperty({
    example: "John Doe",
    description: "The full name of the user",
    required: true
  })
  first_name: string;

  @ApiProperty({
    example: "user@example.com",
    description: "The email of the user",
    required: true
  })
  email: string;

  @ApiPropertyOptional({
    example: "Manager",
    description: "The position of the user",
    required: false
  })
  position?: string | undefined;

  @ApiPropertyOptional({
    example: "https://example.com/avatar.jpg",
    description: "The avatar URL of the user",
    required: false
  })
  avatar_url?: string | undefined;

  @ApiProperty({
    example: Role.USER,
    description: "The role of the user",
    required: true
  })
  role: Role;

  @ApiProperty({
    example: "2022-01-01T12:00:00.000Z",
    description: "The date and time when the user was created",
    required: true
  })
  created_at: string;

  @ApiProperty({
    example: "2022-01-01T12:00:00.000Z",
    description: "The date and time when the user was updated",
    required: true
  })
  updated_at: string;

  @ApiPropertyOptional({
    example: "2022-01-01T12:00:00.000Z",
    description: "The date and time when the user was deleted",
    required: false
  })
  deleted_at?: string | undefined;

  @ApiProperty({
    example: "Doe",
    description: "The last name of the user",
    required: true
  })
  last_name: string;
}

export class LoginResponseDTO implements LoginDTO {
  @ApiProperty({
    description: "The user object",
    required: true
  })
  user: UserWithPermissionsDTO;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3YjUzMmQxZjJkMmE2MjIzYTNhMjEiLCJpYXQiOjE2NTQ3NzY2NjAsImV4cCI6MTY1NDc3NzI2MH0.OTI4YjIyYmI4NzU3MzM3MzgwNmU3MjQ2M2E4OWYyZjUxNDM1YzUxNjliNGU1YmY4MjRhYjUwMjcxNjU3MzA",
    description: "The access token that can be used to access protected routes",
    required: true
  })
  access_token: string;
}
