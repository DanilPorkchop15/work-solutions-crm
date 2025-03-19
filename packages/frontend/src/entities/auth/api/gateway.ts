import { Service, Token } from "typedi";

import { METHODS, RequestManager } from "shared/lib/requestManager";

import type {
  AuthTransport,
  ChangePasswordRequest,
  CheckResetCodeRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "../interfaces";

import { loginDataDecoder } from "./decoders";

export const AuthTransportToken = new Token<AuthTransport>("AuthTransport");

@Service(AuthTransportToken)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AuthApi extends RequestManager implements AuthTransport {
  public async loginRequest(request: LoginRequest): Promise<string> {
    return this.createRequest({ url: "/api/auth/local", method: METHODS.POST, serverDataDecoder: loginDataDecoder })(
      request,
    );
  }

  public async checkResetCodeRequest(request: CheckResetCodeRequest): Promise<boolean> {
    try {
      await this.createRequest({ url: "/api/users-permissions/checkResetCode", method: METHODS.GET })(request);
      return true;
    } catch (e) {
      return false;
    }
  }
  public async changePasswordRequest(request: ChangePasswordRequest): Promise<void> {
    await this.createRequest({ url: "/api/auth/reset-password", method: METHODS.POST })(request);
  }

  public async resetPasswordRequest(request: ResetPasswordRequest): Promise<void> {
    await this.createRequest({ url: "/api/auth/forgot-password", method: METHODS.POST })(request);
  }
}
