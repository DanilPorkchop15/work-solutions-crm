import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import type { UserCreateFormValues, UserUpdateFormValues } from "../interfaces";

export const mapUserCreateFormValuesToCreateUserDto = (values: UserCreateFormValues): UserCreateRequestDTO => ({
  full_name: values.full_name,
  email: values.email,
  role: values.role,
  password: values.password,
  position: values.position,
  avatar_url: values.avatar_url
});

export const mapUserUpdateFormValuesToUpdateUserDto = (
  values: UserUpdateFormValues
): UserUpdateRequestDTO & { role: Role } => ({
  full_name: values.full_name,
  email: values.email,
  position: values.position,
  avatar_url: values.avatar_url,
  role: values.role
});
