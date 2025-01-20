import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginValidationDTO implements LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
