import { LoggerService } from "@backend/app/logger/logger.service";
import { LogType } from "@backend/app/logger/logger.types";
import { Logger } from "@backend/decorators/logger.decorator";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  UserApi,
  UserCreateRequestDTO,
  USERS_ROUTES,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UserService } from "./user.service";

@Controller()
export class UserController implements UserApi {
  constructor(
    private readonly usersService: UserService,
    private readonly loggerService: LoggerService
  ) {}

  @Get(USERS_ROUTES.findAll())
  findAll(): Promise<UserPreviewDTO[]> {
    return this.usersService.findAll();
  }

  @Post(USERS_ROUTES.create())
  @Logger("user", "user")
  async create(@Body() dto: UserCreateRequestDTO): Promise<UserDTO> {
    const user: UserDTO = await this.usersService.create(dto);
    await this.loggerService.logByType(LogType.USER, "created", "new user", { user_id: user.id });
    return user;
  }

  @Post(USERS_ROUTES.bulkCreate())
  bulkCreate(@Body() dto: UserCreateRequestDTO[]): Promise<UserPreviewDTO[]> {
    return this.usersService.bulkCreate(dto);
  }

  @Patch(USERS_ROUTES.update(":userId"))
  update(@Param("userId") userId: string, @Body() dto: UserUpdateRequestDTO): Promise<UserDTO> {
    return this.usersService.update(userId, dto);
  }

  @Delete(USERS_ROUTES.delete(":userId"))
  delete(@Param("userId") userId: string): Promise<void> {
    return this.usersService.delete(userId);
  }

  @Patch(USERS_ROUTES.restore(":userId"))
  restore(@Param("userId") userId: string): Promise<void> {
    return this.usersService.restore(userId);
  }
}
