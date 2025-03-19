import type { Endpoint, Pagination, Request, TableDto } from "shared/model/interfaces";

import type { User } from "./domain";
import type { UsersFilter } from "./filter";
import type { CreateUserDto, UpdateUserAvatarDto, UpdateUserDto } from "./request.dto";
import type { UsersSorting } from "./sorting";

export type GetUsersRequest = Request<{ additionalQueryParams: Pagination & UsersFilter & UsersSorting }>;
export type GetUserRequest = Request<{ urlParams: { id: Guid } }>;
export type CreateUserRequest = Request<{ body: CreateUserDto }>;
export type UpdateUserRequest = Request<{ urlParams: { id: Guid }; body: UpdateUserDto }>;
export type UpdateUserAvatarRequest = Request<{ urlParams: { id: Guid }; body: UpdateUserAvatarDto }>;
export type DeleteUserRequest = Request<{ urlParams: { id: Guid } }>;

export interface UsersTransport {
  getUsers: Endpoint<GetUsersRequest, TableDto<User>>;
  getUsersList: Endpoint<void, TableDto<User>>;
  getUser: Endpoint<GetUserRequest, User>;
  createUser: Endpoint<CreateUserRequest>;
  updateUser: Endpoint<UpdateUserRequest>;
  updateUserAvatar: Endpoint<UpdateUserAvatarRequest>;
  deleteUser: Endpoint<DeleteUserRequest>;
}
