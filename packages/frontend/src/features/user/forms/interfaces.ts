import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

export interface UserCreateFormValues {
  fullName: string;
  email: string;
  password: string;
  position?: string;
  avatarUrl?: string;
  role: Role;
}

export type UserUpdateFormValues = Omit<UserCreateFormValues, "password" | "role">;
