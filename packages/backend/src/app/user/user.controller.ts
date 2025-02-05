import { AuthGuard } from "@backend/app/auth/auth.guard";
import { LoggerService } from "@backend/app/logger/logger.service";
import { LogType } from "@backend/app/logger/logger.types";
import {
  UserBulkDeleteValidationDTO,
  UserBulkRestoreValidationDTO,
  UserChangePasswordValidationDTO,
  UserChangeRoleValidationDTO,
  UserCreateValidationDTO,
  UserPreviewResponseDTO,
  UserResponseDTO,
  UserUpdateValidationDTO
} from "@backend/app/user/user.dto";
import { CurrentUser } from "@backend/decorators/current-user.decorator";
import { Logger } from "@backend/decorators/logger.decorator";
import { User } from "@backend/models/entities/user.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserApi, USERS_ROUTES } from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UserService } from "./user.service";

@ApiTags("Users")
@ApiBearerAuth()
@Controller()
export class UserController implements UserApi {
  constructor(
    private readonly usersService: UserService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard)
  @Get(USERS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({ status: 200, type: [UserPreviewResponseDTO] })
  findAll(): Promise<UserPreviewDTO[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, type: UserResponseDTO })
  @Logger("user", "user")
  async create(@Body() dto: UserCreateValidationDTO): Promise<UserDTO> {
    const user: UserDTO = await this.usersService.create(dto);
    await this.loggerService.logByType(LogType.USER, "created", "new user", { user_id: user.id });
    return this.usersService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.bulkCreate())
  @ApiOperation({ summary: "Bulk create users" })
  @ApiResponse({ status: 201, type: [UserPreviewResponseDTO] })
  bulkCreate(@Body() dto: UserCreateValidationDTO[]): Promise<UserPreviewDTO[]> {
    return this.usersService.bulkCreate(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(USERS_ROUTES.update(":userId"))
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  update(@Param("userId") userId: string, @Body() dto: UserUpdateValidationDTO): Promise<UserDTO> {
    return this.usersService.update(userId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(USERS_ROUTES.delete(":userId"))
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 204 })
  delete(@Param("userId") userId: string): Promise<void> {
    return this.usersService.delete(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(USERS_ROUTES.restore(":userId"))
  @ApiOperation({ summary: "Restore a user" })
  @ApiResponse({ status: 204 })
  restore(@Param("userId") userId: string): Promise<void> {
    return this.usersService.restore(userId);
  }

  @Delete(USERS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Bulk delete users" })
  @ApiBody({ type: [UserBulkDeleteValidationDTO] })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  bulkDelete(@Body() dto: UserBulkDeleteValidationDTO): Promise<void> {
    return this.usersService.bulkDelete(dto);
  }

  @Patch(USERS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore users" })
  @ApiBody({ type: [UserBulkRestoreValidationDTO] })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  bulkRestore(@Body() dto: UserBulkRestoreValidationDTO): Promise<void> {
    return this.usersService.bulkRestore(dto);
  }

  @Patch(USERS_ROUTES.changeRole())
  @ApiOperation({ summary: "Change user role" })
  @ApiBody({ type: UserChangeRoleValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  changeRole(@Body() dto: UserChangeRoleValidationDTO): Promise<void> {
    return this.usersService.changeRole(dto.user_id, dto.role);
  }

  @Patch(USERS_ROUTES.changePassword())
  @ApiOperation({ summary: "Change user password" })
  @ApiBody({ type: UserChangePasswordValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  changePassword(@Body() dto: UserChangePasswordValidationDTO, @CurrentUser() user: User): Promise<void> {
    return this.usersService.changePassword(user.user_id, dto.new_password, dto.old_password);
  }
}
