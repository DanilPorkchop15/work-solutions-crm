import { Controller, Get, Post } from "@nestjs/common";
import { AUTH_ROUTES, AuthApi, LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserDTO } from "@work-solutions-crm/libs/shared/users/users.dto";

@Controller()
export class AuthController implements AuthApi {
  @Post(AUTH_ROUTES.login())
  async login(dto: LoginRequestDTO): Promise<LoginDTO> {
    // TODO
    return Promise.resolve(undefined);
  }

  @Get(AUTH_ROUTES.me())
  async me(): Promise<UserDTO> {
    // TODO
    return Promise.resolve(undefined);
  }
}
