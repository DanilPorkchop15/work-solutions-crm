import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  UserApi,
  UserBulkDeleteRequestDTO,
  UserBulkRestoreRequestDTO,
  UserChangePasswordRequestDTO,
  UserChangeRoleRequestDTO,
  UserCreateRequestDTO,
  USERS_ROUTES,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UserService } from "./user.service";

@Controller()
export class UserController implements UserApi {
  constructor(private readonly usersService: UserService) {}

  @Get(USERS_ROUTES.findAll())
  findAll(): Promise<UserPreviewDTO[]> {
    return this.usersService.findAll();
  }

  @Post(USERS_ROUTES.create())
  create(@Body() dto: UserCreateRequestDTO): Promise<UserDTO> {
    return this.usersService.create(dto);
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

  @Delete(USERS_ROUTES.bulkDelete())
  bulkDelete(@Body() dto: UserBulkDeleteRequestDTO): Promise<void> {
    return this.usersService.bulkDelete(dto);
  }

  @Patch(USERS_ROUTES.bulkRestore())
  bulkRestore(@Body() dto: UserBulkRestoreRequestDTO): Promise<void> {
    return this.usersService.bulkRestore(dto);
  }

  @Patch(USERS_ROUTES.changeRole())
  changeRole(@Body() dto: UserChangeRoleRequestDTO): Promise<void> {
    return this.usersService.changeRole(dto.user_id, dto.role);
  }

  @Patch(USERS_ROUTES.changePassword())
  changePassword(@Body() dto: UserChangePasswordRequestDTO): Promise<void> {
    return this.usersService.changePassword(dto.user_id, dto.new_password, dto.old_password);
  }
}
