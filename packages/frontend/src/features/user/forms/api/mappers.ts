import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";

import type { UserCreateFormValues, UserUpdateFormValues } from "../interfaces";

export const mapUserCreateFormValuesToCreateUserDto = (values: UserCreateFormValues): UserCreateRequestDTO => ({
  full_name: values.fullName,
  email: values.email,
  role: values.role,
  password: values.password,
  position: values.position,
  avatar_url: values.avatarUrl
});

export const mapUserUpdateFormValuesToUpdateUserDto = (values: UserUpdateFormValues): UserUpdateRequestDTO => ({
  full_name: values.fullName,
  email: values.email,
  position: values.position,
  avatar_url: values.avatarUrl
});
