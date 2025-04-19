import { tableDecoder } from "@frontend/shared/api";
import { USERS_ROUTES } from "@work-solutions-crm/libs/shared/user/user.api";
import { string } from "jsonous";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import type {
  BulkCreateUserRequest,
  BulkDeleteUserRequest,
  BulkRestoreUserRequest,
  ChangeUserRoleRequest,
  CreateUserRequest,
  DeleteUserRequest,
  FindOneUserRequest,
  RestoreUserRequest,
  UpdateUserRequest,
  UploadUserAvatarRequest,
  User,
  UsersTransport
} from "../../interfaces";

import { userDecoder } from "./decoders";

@singleton()
export class UsersApi extends RequestManager implements UsersTransport {
  public async getUsers(): Promise<TableDto<User>> {
    return this.createRequest({
      url: USERS_ROUTES.findAll(),
      serverDataDecoder: tableDecoder(userDecoder)
    })();
  }

  public async getUser(request: FindOneUserRequest): Promise<User> {
    return this.createRequest({
      url: USERS_ROUTES.findOne(request.urlParams.id),
      serverDataDecoder: userDecoder
    })(request);
  }

  public async createUser(request: CreateUserRequest): Promise<User> {
    return this.createRequest({
      method: METHODS.POST,
      url: USERS_ROUTES.create(),
      serverDataDecoder: userDecoder
    })(request);
  }

  public async bulkCreateUser(request: BulkCreateUserRequest): Promise<TableDto<User>> {
    return this.createRequest({
      method: METHODS.POST,
      url: USERS_ROUTES.bulkCreate(),
      serverDataDecoder: tableDecoder(userDecoder)
    })(request);
  }

  public async bulkDeleteUser(request: BulkDeleteUserRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: USERS_ROUTES.bulkDelete()
    })(request);
  }

  public async bulkRestoreUser(request: BulkRestoreUserRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: USERS_ROUTES.bulkRestore()
    })(request);
  }

  public async changeUserRole(request: ChangeUserRoleRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: USERS_ROUTES.changeRole()
    })(request);
  }

  public async deleteUser(request: DeleteUserRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: USERS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreUser(request: RestoreUserRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: USERS_ROUTES.restore(request.urlParams.id)
    })(request);
  }

  public async updateUser(request: UpdateUserRequest): Promise<User> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: USERS_ROUTES.update(request.urlParams.id),
      serverDataDecoder: userDecoder
    })(request);
  }

  public async uploadAvatar(request: UploadUserAvatarRequest): Promise<string> {
    return this.createRequest({
      method: METHODS.POST,
      url: USERS_ROUTES.uploadAvatar(),
      serverDataDecoder: string
    })(request);
  }
}
