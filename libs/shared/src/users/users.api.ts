import { APIRoutes } from "../api-routes";

import { UserDTO, UserPreviewDTO, UserRole } from "./users.dto";

export interface UserCreateRequestDTO {
  fullName: string;
  email: string;
  password: string;
  position?: string;
  avatarUrl?: string;
  role: UserRole;
}

export type UserUpdateRequestDTO = Partial<Omit<UserCreateRequestDTO, "role">>;

export interface UsersApi {
  findAll: () => Promise<UserPreviewDTO[]>;
  create: (dto: UserCreateRequestDTO) => Promise<UserDTO>;
  update: (userId: string, dto: UserUpdateRequestDTO) => Promise<UserDTO>;
  delete: (userId: string) => Promise<void>;
  restore: (userId: string) => Promise<void>;
  bulkCreate: (dto: UserCreateRequestDTO[]) => Promise<UserPreviewDTO[]>;
}

export const USERS_ROUTES: APIRoutes<UsersApi> = {
  findAll: () => "/users",
  create: () => "/users",
  update: (userId: string) => `/users/${userId}`,
  delete: (userId: string) => `/users/${userId}`,
  restore: (userId: string) => `/users/${userId}/restore`,
  bulkCreate: () => "/users/bulk-create"
};
