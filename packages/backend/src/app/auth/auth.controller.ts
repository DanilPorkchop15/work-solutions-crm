import { Body, Controller, Get, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AUTH_ROUTES, AuthApi } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO, PermissionDTO, UserWithPermissionsDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";

import { CurrentUser } from "../../decorators/current-user.decorator";
import { User } from "../../models/entities/user.entity";
import { AppAbility, CaslAbilityFactory } from "../permission/casl-ability.factory";
import { mapUserToDTO } from "../user/user.mappers";

import { LoginResponseDTO, LoginValidationDTO, UserWithPermissionsResponseDTO } from "./auth.dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserChangePasswordValidationDTO } from "@backend/app/user/user.dto";
import { LogType } from "@backend/app/logger/logger.types";
import { LoggerService } from "@backend/app/logger/logger.service";

@ApiTags("Auth")
@Controller()
export class AuthController implements AuthApi {
  constructor(
    private readonly authService: AuthService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly loggerService: LoggerService
  ) {}

  @Post(AUTH_ROUTES.login())
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  async login(@Body() dto: LoginValidationDTO, @Res({ passthrough: true }) res: Response): Promise<LoginDTO> {
    const { access_token, user }: LoginDTO = await this.authService.login(dto);

    const refreshToken: string = await this.authService.getRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
    });

    return { access_token, user };
  }

  @UseGuards(AuthGuard)
  @Get(AUTH_ROUTES.me())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user info" })
  @ApiResponse({ status: 200, type: UserWithPermissionsResponseDTO })
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

  @Post(AUTH_ROUTES.logout())
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200 })
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    res.clearCookie("refreshToken");
  }

  @Patch(AUTH_ROUTES.changePassword())
  @ApiOperation({ summary: "Change user password" })
  @ApiBody({ type: UserChangePasswordValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async changePassword(@Body() dto: UserChangePasswordValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.authService.changePassword(user.user_id, dto.new_password, dto.old_password);
    return this.loggerService.logByType(LogType.USER, "password changed", "user", { user_id: user.user_id });
  }
}
