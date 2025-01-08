import { APIRoutes } from "../api-routes";

import { UserDTO, UserPreviewDTO } from "./users.dto";

export interface UserUpdateRequestDTO {
  fullName?: string;
  email?: string;
  position?: string;
  avatarUrl?: string | null;
}

export interface UsersApi {
  findAll: () => Promise<UserPreviewDTO[]>;
  update: (userId: string, dto: UserUpdateRequestDTO) => Promise<UserDTO>;
  delete: (userId: string) => Promise<void>;
  restore: (userId: string) => Promise<void>;
}

export const USERS_ROUTES: APIRoutes<UsersApi> = {
  findAll: () => "/users",
  update: (userId: string) => `/users/${userId}`,
  delete: (userId: string) => `/users/${userId}`,
  restore: (userId: string) => `/users/${userId}/restore`
};
