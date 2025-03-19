import { UsersApi } from "@frontend/entities/@common/user/api";
import {
  FilterParams,
  PaginationParams,
  PathParams,
  SortingParams
} from "@frontend/shared/model/additionalRequestParams";
import type { TableDto } from "@frontend/shared/model/interfaces";
import { TableModule } from "@frontend/shared/model/tableModule";
import { Inject, Service } from "typedi";

import type { User } from "./interfaces";

@Service()
export class UsersTableModule extends TableModule<User, never, never> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<Record<string, never>>;

  constructor(@Inject() private readonly _api: UsersApi) {
    super();
    this.pathParams = new PathParams<Record<string, never>>({});
  }

  protected async _getData(): Promise<TableDto<User>> {
    return this._api.getUsers();
  }
}
