import { APIRoutes } from "../api-routes";

import { LoginDTO, UserWithPermissionsDTO } from "./auth.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RefreshRequestDTO {
  refreshToken: string;
}

export interface AuthApi {
  me(...omitted: never): UserWithPermissionsDTO;
  login(dto: LoginRequestDTO, ...omitted: never): Promise<LoginDTO>;
  logout(...omitted: never): void;
}

export const AUTH_ROUTES: APIRoutes<AuthApi> = {
  me: () => `/auth/me`,
  login: () => `/auth/login`,
  logout: () => `/auth/logout`
};
