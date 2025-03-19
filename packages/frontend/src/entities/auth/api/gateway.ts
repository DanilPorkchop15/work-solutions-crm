import { LoginData } from "@frontend/entities/auth/interfaces";
import { METHODS, RequestManager } from "@frontend/shared/lib/requestManager";
import { AUTH_ROUTES } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { Service } from "typedi";

import type { AuthTransport, LoginRequest } from "../interfaces";

import { loginDataDecoder } from "./decoders";

@Service()
export class AuthApi extends RequestManager implements AuthTransport {
  public async loginRequest(request: LoginRequest): Promise<LoginData> {
    return this.createRequest({ url: AUTH_ROUTES.login(), method: METHODS.POST, serverDataDecoder: loginDataDecoder })(
      request
    );
  }

  public async logoutRequest(): Promise<void> {
    return this.createRequest({ url: AUTH_ROUTES.logout(), method: METHODS.POST })();
  }
}
