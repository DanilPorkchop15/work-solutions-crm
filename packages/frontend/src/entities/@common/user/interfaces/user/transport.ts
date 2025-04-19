import {
  UserBulkDeleteRequestDTO,
  UserBulkRestoreRequestDTO,
  UserChangeRoleRequestDTO,
  UserCreateRequestDTO,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";

import { TableDto } from "../../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../../shared/model/interfaces/transport";

import type { User } from "./domain";

export type FindOneUserRequest = Request<{ urlParams: { id: string } }>;
export type CreateUserRequest = Request<{ body: UserCreateRequestDTO }>;
export type UpdateUserRequest = Request<{ urlParams: { id: string }; body: UserUpdateRequestDTO }>;
export type DeleteUserRequest = Request<{ urlParams: { id: string } }>;
export type RestoreUserRequest = Request<{ urlParams: { id: string } }>;
export type BulkCreateUserRequest = Request<{ body: UserCreateRequestDTO[] }>;
export type BulkDeleteUserRequest = Request<{ body: UserBulkDeleteRequestDTO }>;
export type BulkRestoreUserRequest = Request<{ body: UserBulkRestoreRequestDTO }>;
export type ChangeUserRoleRequest = Request<{ body: UserChangeRoleRequestDTO }>;
export type UploadUserAvatarRequest = Request<{ body: FormData }>;

export interface UsersTransport {
  getUser: Endpoint<FindOneUserRequest, User>;
  getUsers: Endpoint<void, TableDto<User>>;
  createUser: Endpoint<CreateUserRequest, User>;
  updateUser: Endpoint<UpdateUserRequest, User>;
  deleteUser: Endpoint<DeleteUserRequest>;
  restoreUser: Endpoint<RestoreUserRequest>;
  bulkCreateUser: Endpoint<BulkCreateUserRequest, TableDto<User>>;
  bulkDeleteUser: Endpoint<BulkDeleteUserRequest>;
  bulkRestoreUser: Endpoint<BulkRestoreUserRequest>;
  changeUserRole: Endpoint<ChangeUserRoleRequest>;
  uploadAvatar: Endpoint<UploadUserAvatarRequest, string>;
}
