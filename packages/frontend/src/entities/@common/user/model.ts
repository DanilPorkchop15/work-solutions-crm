import { FilterParams, PaginationParams, PathParams, SortingParams } from "shared/model/additionalRequestParams";
import type { Pagination, TableDto } from "shared/model/interfaces";
import { TableModule } from "shared/model/tableModule";

import type { User, UsersFilter, UsersSorting, UsersSortingKeys, UsersTransport } from "./interfaces";

export class UsersTableModule extends TableModule<User, UsersFilter, UsersSortingKeys> {
  public readonly filter: FilterParams<UsersFilter> = new FilterParams<UsersFilter>({ role: undefined });
  public readonly sorting: SortingParams<UsersSortingKeys> = new SortingParams<UsersSortingKeys>();
  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });
  public pathParams: PathParams<Record<string, never>>;

  constructor(private readonly _transport: UsersTransport) {
    super();
    this.sorting.set("orderBy", "lastName");
    this.pathParams = new PathParams<Record<string, never>>({});
  }

  protected async _getData(additionalQueryParams: Pagination & UsersFilter & UsersSorting): Promise<TableDto<User>> {
    return this._transport.getUsers({ additionalQueryParams });
  }
}
