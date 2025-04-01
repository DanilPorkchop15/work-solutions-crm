import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";

import type { UserCreateFormValues, UserUpdateFormValues } from "../interfaces";

export const mapUserCreateFormValuesToCreateUserDto = (values: UserCreateFormValues): UserCreateRequestDTO => ({
  fullName: values.fullName,
  email: values.email,
  role: values.role,
  password: values.password,
  position: values.position,
  avatarUrl: values.avatarUrl
});

export const mapUserUpdateFormValuesToUpdateUserDto = (values: UserUpdateFormValues): UserUpdateRequestDTO => ({
  fullName: values.fullName,
  email: values.email,
  position: values.position,
  avatarUrl: values.avatarUrl
});
