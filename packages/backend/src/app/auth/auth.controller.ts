import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AUTH_ROUTES, AuthApi, RefreshRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import {
  LoginDTO,
  PermissionDTO,
  TokenDTO,
  UserWithPermissionsDTO
} from "@work-solutions-crm/libs/shared/auth/auth.dto";

import { CurrentUser } from "../../decorators/current-user.decorator";
import { User } from "../../models/entities/user.entity";
import { AppAbility, CaslAbilityFactory } from "../permission/casl-ability.factory";
import { mapUserToDTO } from "../user/user.mappers";

import { LoginValidationDTO } from "./auth.dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController implements AuthApi {
  constructor(
    private readonly authService: AuthService,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

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
  me(@CurrentUser() user: User): UserWithPermissionsDTO {
    const ability: AppAbility = this.caslAbilityFactory.createForUser(user);

    const permissions: PermissionDTO[] = ability.rules.map(rule => ({
      action: rule.action,
      subject: rule.subject,
      conditions: rule.conditions || null,
      inverted: rule.inverted || false
    }));
    return {
      ...mapUserToDTO(user),
      permissions
    };
  }
}
