import { AuthGuard } from "@backend/app/auth/auth.guard";
import { UserCreateValidationDTO, UserUpdateValidationDTO } from "@backend/app/user/user.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserApi, USERS_ROUTES } from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UserService } from "./user.service";

@ApiTags("Users")
@ApiBearerAuth()
@Controller()
export class UserController implements UserApi {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(USERS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all users" })
  // @ApiResponse({ status: 200, type: [UserPreviewDTO] })
  findAll(): Promise<UserPreviewDTO[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new user" })
  // @ApiResponse({ status: 201, type: UserDTO })
  create(@Body() dto: UserCreateValidationDTO): Promise<UserDTO> {
    return this.usersService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Post(USERS_ROUTES.bulkCreate())
  @ApiOperation({ summary: "Bulk create users" })
  // @ApiResponse({ status: 201, type: [UserPreviewDTO] })
  bulkCreate(@Body() dto: UserCreateValidationDTO[]): Promise<UserPreviewDTO[]> {
    return this.usersService.bulkCreate(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(USERS_ROUTES.update(":userId"))
  @ApiOperation({ summary: "Update a user" })
  // @ApiResponse({ status: 200, type: UserDTO })
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
}
