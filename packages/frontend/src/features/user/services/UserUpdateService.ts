import { User, UsersApi } from "@frontend/entities/@common/user";
import { UserDetailsService } from "@frontend/entities/@common/user/model";
import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { inject, singleton } from "tsyringe";

@singleton()
export class UserUpdateService {
  constructor(
    @inject(UsersApi) private readonly _api: UsersApi,
    @inject(UserDetailsService) private readonly _userDetailsService: UserDetailsService
  ) {}

  public get userDetails(): User {
    const userDetails: User | null = this._userDetailsService.userDetails;

    if (!userDetails) {
      throw new Error("UserDetailsService not found");
    }
    return userDetails;
  }

  public async update(dto: UserUpdateRequestDTO): Promise<void> {
    const id: string = this.userDetails.id;

    await this._api.updateUser({ urlParams: { id }, body: dto });
    await this._userDetailsService.loadUserDetails({ urlParams: { id } });
  }
}
