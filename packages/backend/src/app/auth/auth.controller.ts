import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AUTH_ROUTES, AuthApi, RefreshRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO, TokenDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { CurrentUser } from "../../decorators/current-user.decorator";

import { LoginValidationDTO } from "./auth.dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController implements AuthApi {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ROUTES.login())
  async login(@Body() dto: LoginValidationDTO): Promise<LoginDTO> {
    return await this.authService.login(dto);
  }

  @Post(AUTH_ROUTES.refresh())
  refresh(@Body() { refreshToken }: RefreshRequestDTO): TokenDTO {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get(AUTH_ROUTES.me())
  me(@CurrentUser() user: UserDTO): UserDTO {
    return user;
  }
}
