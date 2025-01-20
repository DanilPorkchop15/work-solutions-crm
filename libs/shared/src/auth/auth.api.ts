import { APIRoutes } from "../api-routes";

import { LoginDTO, TokenDTO, UserWithPermissionsDTO } from "./auth.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RefreshRequestDTO {
  refreshToken: string;
}

export interface AuthApi {
  me(...ommitted: any): UserWithPermissionsDTO;
  login(dto: LoginRequestDTO): Promise<LoginDTO>;
  refresh(dto: RefreshRequestDTO): TokenDTO;
}

export const AUTH_ROUTES: APIRoutes<AuthApi> = {
  me: () => `/auth/me`,
  login: () => `/auth/login`,
  refresh: () => `/auth/refresh`
};
