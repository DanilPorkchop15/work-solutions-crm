import { AUTH_ROUTES } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { USERS_ROUTES } from "@work-solutions-crm/libs/shared/user/user.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../shared/lib/requestManager/requestManager";
import type { AuthTransport, ChangePasswordRequest, LoginData, LoginRequest } from "../interfaces";

import { loginDataDecoder } from "./decoders";

@singleton()
export class AuthApi extends RequestManager implements AuthTransport {
  public async loginRequest(request: LoginRequest): Promise<LoginData> {
    return this.createRequest({ url: AUTH_ROUTES.login(), method: METHODS.POST, serverDataDecoder: loginDataDecoder })(
      request
    );
  }

  public async logoutRequest(): Promise<void> {
    return this.createRequest({ url: AUTH_ROUTES.logout(), method: METHODS.POST })();
  }

  changePasswordRequest(request: ChangePasswordRequest): Promise<void> {
    return this.createRequest({ url: AUTH_ROUTES.changePassword(), method: METHODS.PATCH })(request);
  }
}
