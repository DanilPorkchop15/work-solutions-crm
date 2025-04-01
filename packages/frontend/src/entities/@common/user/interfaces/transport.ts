import {
  UserBulkDeleteRequestDTO,
  UserBulkRestoreRequestDTO,
  UserChangeRoleRequestDTO,
  UserCreateRequestDTO,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";

import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { User } from "./domain";

export type FindOneUserRequest = Request<{ urlParams: { id: Guid } }>;
export type CreateUserRequest = Request<{ body: UserCreateRequestDTO }>;
export type UpdateUserRequest = Request<{ urlParams: { id: Guid }; body: UserUpdateRequestDTO }>;
export type DeleteUserRequest = Request<{ urlParams: { id: Guid } }>;
export type RestoreUserRequest = Request<{ urlParams: { id: Guid } }>;
export type BulkCreateUserRequest = Request<{ body: UserCreateRequestDTO[] }>;
export type BulkDeleteUserRequest = Request<{ body: UserBulkDeleteRequestDTO }>;
export type BulkRestoreUserRequest = Request<{ body: UserBulkRestoreRequestDTO }>;
export type ChangeUserRoleRequest = Request<{ body: UserChangeRoleRequestDTO }>;

export interface UsersTransport {
  getUser: Endpoint<FindOneUserRequest, User>;
  getUsers: Endpoint<void, TableDto<User>>;
  createUser: Endpoint<CreateUserRequest, User>;
  updateUser: Endpoint<UpdateUserRequest, User>;
  deleteUser: Endpoint<DeleteUserRequest, void>;
  restoreUser: Endpoint<RestoreUserRequest, void>;
  bulkCreateUser: Endpoint<BulkCreateUserRequest, TableDto<User>>;
  bulkDeleteUser: Endpoint<BulkDeleteUserRequest, void>;
  bulkRestoreUser: Endpoint<BulkRestoreUserRequest, void>;
  changeUserRole: Endpoint<ChangeUserRoleRequest, void>;
}
