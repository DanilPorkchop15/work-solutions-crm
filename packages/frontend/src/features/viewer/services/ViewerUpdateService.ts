import { User, UsersApi } from "@frontend/entities/@common/user";
import { UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

import { ViewerService } from "../../../entities/viewer/service";

@singleton()
export class ViewerUpdateService {
  constructor(
    @inject(UsersApi) private readonly _api: UsersApi,
    @inject(ViewerService) private readonly _viewerService: ViewerService
  ) {
    makeAutoObservable(this);
  }

  public get viewer(): User {
    const viewer: User | null = this._viewerService.viewer?.state ?? null;

    if (!viewer) {
      throw new Error("UserDetailsService not found");
    }
    return viewer;
  }

  public async update(dto: UserUpdateRequestDTO): Promise<User> {
    const id: string = this.viewer.id;

    console.info(id);

    const user: User = await this._api.updateUser({ urlParams: { id }, body: dto });
    await this._viewerService.loadViewer();

    return user;
  }
}
