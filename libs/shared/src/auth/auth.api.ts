import { APIRoutes } from "../api-routes";
import { UserDTO } from "../user/user.dto";

import { LoginDTO, TokenDTO } from "./auth.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RefreshRequestDTO {
  refreshToken: string;
}

export interface AuthApi {
  me(user?: UserDTO): UserDTO;
  login(dto: LoginRequestDTO): Promise<LoginDTO>;
  refresh(dto: RefreshRequestDTO): TokenDTO;
}

export const AUTH_ROUTES: APIRoutes<AuthApi> = {
  me: () => `/auth/me`,
  login: () => `/auth/login`,
  refresh: () => `/auth/refresh`
};
