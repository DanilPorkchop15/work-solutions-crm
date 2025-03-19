import { LoginData } from "@frontend/entities/auth/interfaces/domain";
import type { Endpoint, Request } from "@frontend/shared/model/interfaces";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";

export type LoginRequest = Request<{ body: LoginRequestDTO }>;

export interface AuthTransport {
  loginRequest: Endpoint<LoginRequest, LoginData>;
  logoutRequest: Endpoint<void, void>;
}
