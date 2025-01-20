import { APIRoutes } from "../api-routes";
import { UserDTO } from "../users/users.dto";

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
  refresh(dto: RefreshRequestDTO): Promise<TokenDTO>;
}

export const AUTH_ROUTES: APIRoutes<AuthApi> = {
  me: () => `/auth/me`,
  login: () => `/auth/login`,
  refresh: () => `/auth/refresh`
};
