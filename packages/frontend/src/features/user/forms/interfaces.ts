import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

export interface UserCreateFormValues {
  full_name: string;
  email: string;
  password: string;
  position?: string;
  avatar_url?: string;
  role: Role;
}

export type UserUpdateFormValues = Omit<UserCreateFormValues, "password">;
