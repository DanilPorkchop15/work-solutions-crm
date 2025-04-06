import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserApi, USERS_ROUTES } from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  UserBulkDeleteValidationDTO,
  UserBulkRestoreValidationDTO,
  UserChangeRoleValidationDTO,
  UserCreateValidationDTO,
  UserResponseDTO,
  UserUpdateValidationDTO
} from "./user.dto";
import { mapUserToDTO } from "./user.mappers";
import { UserService } from "./user.service";

@ApiTags("Users")
@ApiBearerAuth()
@Controller()
export class UserController implements UserApi {
  constructor(
    private readonly usersService: UserService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.USERS))
  @Get(USERS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({ status: 200, type: [UserResponseDTO] })
  @Logger("findAll", "users")
  async findAll(): Promise<UserDTO[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.USERS))
  @Get(USERS_ROUTES.findOne(":userId"))
  @ApiOperation({ summary: "Retrieve a user by id" })
  @ApiResponse({ status: 200, type: UserResponseDTO })
  @Logger("findOne", "user")
  async findOne(@Param("userId") userId: string): Promise<UserDTO> {
    const user: User | null = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return mapUserToDTO(user);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.CREATE, Subject.USERS))
  @Post(USERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, type: UserResponseDTO })
  async create(@Body() dto: UserCreateValidationDTO, @CurrentUser() user: User): Promise<UserDTO> {
    const userDto: UserDTO = await this.usersService.create(dto);
    await this.loggerService.logByType(LogType.USER, "created", "new user", { user_id: user.user_id });
    return userDto;
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.CREATE, Subject.USERS))
  @Post(USERS_ROUTES.bulkCreate())
  @ApiOperation({ summary: "Bulk create users" })
  @ApiResponse({ status: 201, type: [UserResponseDTO] })
  async bulkCreate(@Body() dto: UserCreateValidationDTO[], @CurrentUser() user: User): Promise<UserDTO[]> {
    const createdUsers: UserDTO[] = await this.usersService.bulkCreate(dto);
    await this.loggerService.logByType(LogType.USER, "bulk created", "new users", { user_id: user.user_id });
    return createdUsers;
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.USERS))
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

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.USERS))
  @Delete(USERS_ROUTES.delete(":userId"))
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 204 })
  async delete(@Param("userId") userId: string, @CurrentUser() user: User): Promise<void> {
    await this.usersService.delete(userId);
    await this.loggerService.logByType(LogType.USER, "deleted", "user", { user_id: user.user_id });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.USERS))
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
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.USERS))
  async bulkDelete(@Body() dto: UserBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.usersService.bulkDelete(dto);
    await this.loggerService.logByType(LogType.USER, "bulk deleted", "users", { user_id: user.user_id });
  }

  @Patch(USERS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore users" })
  @ApiBody({ type: [UserBulkRestoreValidationDTO] })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.USERS))
  async bulkRestore(@Body() dto: UserBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.usersService.bulkRestore(dto);
    await this.loggerService.logByType(LogType.USER, "bulk restored", "users", { user_id: user.user_id });
  }

  @Patch(USERS_ROUTES.changeRole())
  @ApiOperation({ summary: "Change user role" })
  @ApiBody({ type: UserChangeRoleValidationDTO })
  @ApiResponse({ status: 204 })
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.USERS))
  async changeRole(@Body() dto: UserChangeRoleValidationDTO): Promise<void> {
    await this.usersService.changeRole(dto.user_id, dto.role);
    await this.loggerService.logByType(LogType.USER, "role changed", "user", { user_id: dto.user_id });
  }

  @Post(USERS_ROUTES.uploadAvatar())
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.USERS))
  @ApiOperation({ summary: "Upload user avatar" })
  @ApiResponse({ status: 200 })
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User): Promise<string> {
    const url: string = this.usersService.uploadAvatar(file);
    await this.loggerService.logByType(LogType.USER, "avatar uploaded", "user", {
      user_id: user.user_id
    });
    return url;
  }
}
