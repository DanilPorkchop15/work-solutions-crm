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

export interface UserApi {
  findAll: () => Promise<UserPreviewDTO[]>;
  create: (dto: UserCreateRequestDTO) => Promise<UserDTO>;
  update: (userId: string, dto: UserUpdateRequestDTO) => Promise<UserDTO>;
  delete: (userId: string) => Promise<void>;
  restore: (userId: string) => Promise<void>;
  bulkCreate: (dto: UserCreateRequestDTO[]) => Promise<UserPreviewDTO[]>;
}

export const USERS_ROUTES: APIRoutes<UserApi> = {
  findAll: () => "/user",
  create: () => "/user",
  update: (userId: string) => `/users/${userId}`,
  delete: (userId: string) => `/users/${userId}`,
  restore: (userId: string) => `/users/${userId}/restore`,
  bulkCreate: () => "/user/bulk-create"
};
