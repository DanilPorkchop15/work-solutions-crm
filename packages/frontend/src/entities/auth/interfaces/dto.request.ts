export interface LoginDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  email: string;
}

export interface CheckResetCodeDto {
  code: string;
}

export interface ChangePasswordDto {
  password: string;
  passwordConfirmation: string;
  code: string;
}
