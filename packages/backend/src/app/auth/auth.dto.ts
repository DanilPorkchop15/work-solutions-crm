import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginValidationDTO implements LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
  password: string;
}
