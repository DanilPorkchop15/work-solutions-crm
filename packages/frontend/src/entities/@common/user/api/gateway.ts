import { pipe, propEq } from "ramda";
import { Service, Token } from "typedi";

import { tableDecoder } from "shared/api";
import { encodePagination, encodeSorting } from "shared/api/encoders";
import { METHODS, RequestManager } from "shared/lib/requestManager";
import type { TableDto } from "shared/model/interfaces";

import type {
  BackendRole,
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  GetUsersRequest,
  UpdateUserAvatarRequest,
  UpdateUserRequest,
  User,
  UserRole,
  UsersTransport,
} from "../interfaces";

import { backendRolesDecoder, userDecoder } from "./decoders";
import { encodeCreateUserDto, encodeUpdateUserDto, encodeUsersFilter } from "./encoders";

export const UsersTransportToken = new Token<UsersTransport>("UsersTransport");

@Service(UsersTransportToken)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UsersApi extends RequestManager implements UsersTransport {
  private _backendRoles?: BackendRole[];

  public async getUsers({ additionalQueryParams }: GetUsersRequest): Promise<TableDto<User>> {
    return this.createRequest({
      url: "/api/users",
      serverDataDecoder: tableDecoder(userDecoder),
    })({
      additionalQueryParams: pipe(encodeUsersFilter, encodeSorting, encodePagination)(additionalQueryParams),
    });
  }

  public async getUsersList(): Promise<TableDto<User>> {
    return this.createRequest({
      url: "/api/users",
      serverDataDecoder: tableDecoder(userDecoder),
    })();
  }

  public async getUser({ urlParams }: GetUserRequest): Promise<User> {
    return this.createRequest({
      url: "/api/users/{id}",
      serverDataDecoder: userDecoder,
    })({ urlParams });
  }

  public async createUser({ body: { role, ...userDto } }: CreateUserRequest): Promise<void> {
    const roleId = await this._getRoleId(role);

    await this.createRequest({
      url: "/api/users",
      method: METHODS.POST,
    })({ body: encodeCreateUserDto({ ...userDto, roleId }) });
  }

  public async updateUser({ urlParams, body: { oldRole, role, ...userDto } }: UpdateUserRequest): Promise<void> {
    const oldRoleId = await this._getRoleId(oldRole);
    const newRoleId = await this._getRoleId(role);

    await this.createRequest({
      url: "/api/users/{id}",
      method: METHODS.PUT,
    })({
      urlParams,
      body: encodeUpdateUserDto({ ...userDto, oldRoleId, newRoleId }),
    });
  }

  public async updateUserAvatar({ urlParams, body }: UpdateUserAvatarRequest): Promise<void> {
    await this.createRequest({
      url: "/api/users/{id}",
      method: METHODS.PUT,
    })({ urlParams, body });
  }

  public async deleteUser({ urlParams }: DeleteUserRequest): Promise<void> {
    await this.createRequest({
      url: "/api/users/{id}",
      method: METHODS.PUT,
    })({ urlParams, body: { blocked: true } });
  }

  private async _getRoleId(roleName: UserRole): Promise<number> {
    this._backendRoles =
      this._backendRoles ??
      (await this.createRequest({
        url: "/api/users-permissions/roles",
        serverDataDecoder: backendRolesDecoder,
      })());

    const roleId = this._backendRoles.find(propEq("name", roleName))?.id;
    if (roleId) return roleId;

    throw new Error("Role id not found");
  }
}
