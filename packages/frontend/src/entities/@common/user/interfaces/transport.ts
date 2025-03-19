import type { Endpoint, Request, TableDto } from "@frontend//shared/model/interfaces";
import {
  UserBulkDeleteRequestDTO,
  UserBulkRestoreRequestDTO,
  UserChangePasswordRequestDTO,
  UserChangeRoleRequestDTO,
  UserCreateRequestDTO,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";

import type { User } from "./domain";

export type CreateUserRequest = Request<{ body: UserCreateRequestDTO }>;
export type UpdateUserRequest = Request<{ urlParams: { id: Guid }; body: UserUpdateRequestDTO }>;
export type DeleteUserRequest = Request<{ urlParams: { id: Guid } }>;
export type RestoreUserRequest = Request<{ urlParams: { id: Guid } }>;
export type BulkCreateUserRequest = Request<{ body: UserCreateRequestDTO[] }>;
export type BulkDeleteUserRequest = Request<{ body: UserBulkDeleteRequestDTO }>;
export type BulkRestoreUserRequest = Request<{ body: UserBulkRestoreRequestDTO }>;
export type ChangeUserPasswordRequest = Request<{ body: UserChangePasswordRequestDTO }>;
export type ChangeUserRoleRequest = Request<{ body: UserChangeRoleRequestDTO }>;

export interface UsersTransport {
  getUsers: Endpoint<void, TableDto<User>>;
  createUser: Endpoint<CreateUserRequest, User>;
  updateUser: Endpoint<UpdateUserRequest, User>;
  deleteUser: Endpoint<DeleteUserRequest, void>;
  restoreUser: Endpoint<RestoreUserRequest, void>;
  bulkCreateUser: Endpoint<BulkCreateUserRequest, TableDto<User>>;
  bulkDeleteUser: Endpoint<BulkDeleteUserRequest, void>;
  bulkRestoreUser: Endpoint<BulkRestoreUserRequest, void>;
  changeUserPassword: Endpoint<ChangeUserPasswordRequest, void>;
  changeUserRole: Endpoint<ChangeUserRoleRequest, void>;
}
