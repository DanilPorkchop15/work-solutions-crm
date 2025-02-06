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
  @Logger("findAll", "users")
  async findAll(): Promise<UserPreviewDTO[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, type: UserResponseDTO })
  async create(@Body() dto: UserCreateValidationDTO, @CurrentUser() user: User): Promise<UserDTO> {
    const userDto: UserDTO = await this.usersService.create(dto);
    await this.loggerService.logByType(LogType.USER, "created", "new user", { user_id: user.user_id });
    return userDto;
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.bulkCreate())
  @ApiOperation({ summary: "Bulk create users" })
  @ApiResponse({ status: 201, type: [UserPreviewResponseDTO] })
  async bulkCreate(@Body() dto: UserCreateValidationDTO[], @CurrentUser() user: User): Promise<UserPreviewDTO[]> {
    const createdUsers: UserPreviewDTO[] = await this.usersService.bulkCreate(dto);
    await this.loggerService.logByType(LogType.USER, "bulk created", "new users", { user_id: user.user_id });
    return createdUsers;
  }

  @UseGuards(AuthGuard)
  @Patch(USERS_ROUTES.update(":userId"))
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  async update(
    @Param("userId") userId: string,
    @Body() dto: UserUpdateValidationDTO,
    @CurrentUser() user: User
  ): Promise<UserDTO> {
    const updatedUser: UserDTO = await this.usersService.update(userId, dto);
    await this.loggerService.logByType(LogType.USER, "updated", "user", { user_id: user.user_id });
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(USERS_ROUTES.delete(":userId"))
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 204 })
  async delete(@Param("userId") userId: string, @CurrentUser() user: User): Promise<void> {
    await this.usersService.delete(userId);
    await this.loggerService.logByType(LogType.USER, "deleted", "user", { user_id: user.user_id });
  }

  @UseGuards(AuthGuard)
  @Patch(USERS_ROUTES.restore(":userId"))
  @ApiOperation({ summary: "Restore a user" })
  @ApiResponse({ status: 204 })
  async restore(@Param("userId") userId: string, @CurrentUser() user: User): Promise<void> {
    await this.usersService.restore(userId);
    await this.loggerService.logByType(LogType.USER, "restored", "user", { user_id: user.user_id });
  }

  @Delete(USERS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Bulk delete users" })
  @ApiBody({ type: [UserBulkDeleteValidationDTO] })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async bulkDelete(@Body() dto: UserBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.usersService.bulkDelete(dto);
    await this.loggerService.logByType(LogType.USER, "bulk deleted", "users", { user_id: user.user_id });
  }

  @Patch(USERS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore users" })
  @ApiBody({ type: [UserBulkRestoreValidationDTO] })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async bulkRestore(@Body() dto: UserBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.usersService.bulkRestore(dto);
    await this.loggerService.logByType(LogType.USER, "bulk restored", "users", { user_id: user.user_id });
  }

  @Patch(USERS_ROUTES.changeRole())
  @ApiOperation({ summary: "Change user role" })
  @ApiBody({ type: UserChangeRoleValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  @Logger("user", "user")
  async changeRole(@Body() dto: UserChangeRoleValidationDTO): Promise<void> {
    await this.usersService.changeRole(dto.user_id, dto.role);
    await this.loggerService.logByType(LogType.USER, "role changed", "user", { user_id: dto.user_id });
  }

  @Patch(USERS_ROUTES.changePassword())
  @ApiOperation({ summary: "Change user password" })
  @ApiBody({ type: UserChangePasswordValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard)
  async changePassword(@Body() dto: UserChangePasswordValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.usersService.changePassword(user.user_id, dto.new_password, dto.old_password);
    return this.loggerService.logByType(LogType.USER, "password changed", "user", { user_id: user.user_id });
  }
}
