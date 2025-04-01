import { AuthChangePasswordRequestDTO, LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

import { Endpoint, Request } from "../../../shared/model/interfaces/transport";

import { LoginData } from "./domain";

export type LoginRequest = Request<{ body: LoginRequestDTO }>;
export type ChangePasswordRequest = Request<{ body: AuthChangePasswordRequestDTO }>;

export interface AuthTransport {
  loginRequest: Endpoint<LoginRequest, LoginData>;
  logoutRequest: Endpoint<void, void>;
  changePasswordRequest: Endpoint<ChangePasswordRequest, void>;
}
