import { AuthApi, LoginData } from "@frontend/entities/auth";
import { AuthChangePasswordRequestDTO, LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { inject, singleton } from "tsyringe";

import { ViewerService } from "../../entities/viewer/service";
import { CookiesStore } from "../../shared/model/services/cookies";

@singleton()
export class AuthService {
  constructor(
    @inject(AuthApi) private readonly _api: AuthApi,
    @inject(ViewerService) private readonly _viewerService: ViewerService,
    @inject(CookiesStore) private readonly _cookiesStore: CookiesStore
  ) {}

  public async login(body: LoginRequestDTO): Promise<void> {
    const loginData: LoginData = await this._api.loginRequest({ body });
    this._cookiesStore.set("accessToken", `Bearer ${loginData.accessToken}`, { secure: true, expires: 365 });
  }

  public async logout(): Promise<void> {
    await this._api.logoutRequest();
    this._cookiesStore.remove("accessToken");
    this._viewerService.logout();
  }

  public async changePassword(dto: AuthChangePasswordRequestDTO): Promise<void> {
    return this._api.changePasswordRequest({ body: dto });
  }
}
