import { APIRoutes } from "../api-routes";

import { Role, UserDTO, UserPreviewDTO } from "./user.dto";

export interface UserCreateRequestDTO {
  fullName: string;
  email: string;
  password: string;
  position?: string;
  avatarUrl?: string;
  role: Role;
}

export type UserUpdateRequestDTO = Partial<Omit<UserCreateRequestDTO, "role">>;

export interface UserBulkDeleteRequestDTO {
  user_ids: string[];
}

export type UserBulkRestoreRequestDTO = UserBulkDeleteRequestDTO;

export type UserChangeRoleRequestDTO = {
  user_id: string;
  role: Role;
};

export type UserChangePasswordRequestDTO = {
  old_password: string;
  new_password: string;
};

export interface UserApi {
  findAll: () => Promise<UserPreviewDTO[]>;
  create: (dto: UserCreateRequestDTO, ...omitted: never) => Promise<UserDTO>;
  update: (userId: string, dto: UserUpdateRequestDTO, ...omitted: never) => Promise<UserDTO>;
  delete: (userId: string, ...omitted: never) => Promise<void>;
  restore: (userId: string, ...omitted: never) => Promise<void>;
  bulkCreate: (dto: UserCreateRequestDTO[], ...omitted: never) => Promise<UserPreviewDTO[]>;
  bulkDelete: (dto: UserBulkDeleteRequestDTO, ...omitted: never) => Promise<void>;
  bulkRestore: (dto: UserBulkRestoreRequestDTO, ...omitted: never) => Promise<void>;
  changeRole: (dto: UserChangeRoleRequestDTO, ...omitted: never) => Promise<void>;
  changePassword: (dto: UserChangePasswordRequestDTO, ...omitted: never) => Promise<void>;
}

export const USERS_ROUTES: APIRoutes<UserApi> = {
  findAll: () => "/users",
  create: () => "/users",
  update: (userId: string) => `/users/${userId}`,
  delete: (userId: string) => `/users/${userId}`,
  restore: (userId: string) => `/users/${userId}/restore`,
  bulkCreate: () => "/users/bulk-create",
  bulkDelete: () => "/user/bulk-delete",
  bulkRestore: () => "/user/bulk-restore",
  changeRole: () => "/user/role",
  changePassword: () => "/user/password "
};
