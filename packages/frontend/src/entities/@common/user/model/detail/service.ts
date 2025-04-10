import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

import { UsersApi } from "../../api";
import type { FindOneUserRequest, User } from "../../interfaces";

@singleton()
export class UserDetailsService {
  private _userDetailsModel: User | null = null;

  constructor(@inject(UsersApi) private readonly _api: UsersApi) {
    makeAutoObservable(this);
  }

  public get userDetails(): User | null {
    return this._userDetailsModel;
  }

  public async loadUserDetails({ urlParams }: FindOneUserRequest): Promise<void> {
    this._userDetailsModel = await this._api.getUser({ urlParams });
  }
}
