import { UsersApi } from "@frontend/entities/@common/user";
import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { inject, singleton } from "tsyringe";

@singleton()
export class UserService {
  constructor(@inject(UsersApi) private readonly _api: UsersApi) {}

  public async getOne(id: string) {
    return this._api.getUser({ urlParams: { id } });
  }

  public async getAll() {
    return this._api.getUsers();
  }

  public async create(dto: UserCreateRequestDTO) {
    return this._api.createUser({ body: dto });
  }

  public async update(id: string, dto: UserUpdateRequestDTO) {
    return this._api.updateUser({ body: dto, urlParams: { id } });
  }

  public async delete(id: string) {
    return this._api.deleteUser({ urlParams: { id } });
  }

  public async restore(id: string) {
    return this._api.restoreUser({ urlParams: { id } });
  }

  public async bulkCreate(dto: UserCreateRequestDTO[]) {
    return this._api.bulkCreateUser({ body: dto });
  }

  public async bulkDelete(ids: string[]) {
    return this._api.bulkDeleteUser({ body: { user_ids: ids } });
  }

  public async bulkRestore(ids: string[]) {
    return this._api.bulkRestoreUser({ body: { user_ids: ids } });
  }

  public async changeRole(id: string, role: Role) {
    return this._api.changeUserRole({ body: { user_id: id, role } });
  }
}
