import { APIRoutes } from "../api-routes";
import { UserDTO } from "../users/users.dto";

import { LoginDTO } from "./auth.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthApi {
  me(): Promise<UserDTO>;
  login(dto: LoginRequestDTO): Promise<LoginDTO>;
}

export const AUTH_ROUTES: APIRoutes<AuthApi> = {
  me: () => `/auth/me`,
  login: () => `/auth/login`
};
