import type { Media } from "shared/model/interfaces";

import type { UserRole } from "./domain";

export interface BaseUserDto {
  avatar?: Media;
  firstName: string;
  lastName: string;
  blocked: boolean;
  password: string;
  email: string;
  role: UserRole;
}

export type CreateUserDto = BaseUserDto;

export interface UpdateUserDto extends BaseUserDto {
  oldRole: UserRole;
}

export interface UpdateUserAvatarDto {
  avatar: Media;
}

export interface BackendRole {
  id: number;
  name: string;
}
