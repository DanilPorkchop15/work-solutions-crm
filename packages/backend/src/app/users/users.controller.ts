import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  UserCreateRequestDTO,
  USERS_ROUTES,
  UsersApi,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/users/users.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/users/users.dto";

@Controller()
export class UsersController implements UsersApi {
  @Get(USERS_ROUTES.findAll())
  findAll(): Promise<UserPreviewDTO[]> {
    // TODO: Add service logic to fetch all users
    return Promise.resolve([]);
  }

  @Post(USERS_ROUTES.bulkCreate())
  bulkCreate(@Body() dto: UserCreateRequestDTO): Promise<UserPreviewDTO[]> {
    // TODO: Add service logic to bulk create users
    return Promise.resolve([]);
  }

  @Get(USERS_ROUTES.findOne(":userId"))
  findOne(@Param("userId") userId: string): Promise<UserDTO> {
    // TODO: Add service logic to fetch a single user by ID
    return Promise.resolve(undefined);
  }

  @Patch(USERS_ROUTES.update(":userId"))
  update(@Param("userId") userId: string, @Body() dto: UserUpdateRequestDTO): Promise<UserDTO> {
    // TODO: Add service logic to update a user by ID
    return Promise.resolve(undefined);
  }

  @Delete(USERS_ROUTES.delete(":userId"))
  delete(@Param("userId") userId: string): Promise<void> {
    // TODO: Add service logic to delete a user by ID
    return Promise.resolve(undefined);
  }

  @Patch(USERS_ROUTES.restore(":userId"))
  restore(@Param("userId") userId: string): Promise<void> {
    // TODO: Add service logic to restore a user by ID
    return Promise.resolve(undefined);
  }
}
