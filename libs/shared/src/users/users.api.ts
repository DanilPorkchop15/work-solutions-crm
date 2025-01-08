import { APIRoutes } from "../api-routes";

import { UserDTO, UserPreviewDTO, UserRole } from "./users.dto";

export interface UserCreateRequestDTO {
  fullName: string;
  email: string;
  position?: string;
  avatarUrl?: string | null;
  role: UserRole;
}

export type UserUpdateRequestDTO = Partial<Omit<UserCreateRequestDTO, "role">>;

export interface UsersApi {
  findAll: () => Promise<UserPreviewDTO[]>;
  update: (userId: string, dto: UserUpdateRequestDTO) => Promise<UserDTO>;
  delete: (userId: string) => Promise<void>;
  restore: (userId: string) => Promise<void>;
  bulkCreate: (dto: UserCreateRequestDTO) => Promise<UserPreviewDTO[]>;
}

export const USERS_ROUTES: APIRoutes<UsersApi> = {
  findAll: () => "/users",
  update: (userId: string) => `/users/${userId}`,
  delete: (userId: string) => `/users/${userId}`,
  restore: (userId: string) => `/users/${userId}/restore`,
  bulkCreate: () => "/users/bulk-create"
};
