import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../../../shared/model/tableModule";
import { UserLogsApi } from "../../../api";
import type { UserLog } from "../../../interfaces";

@singleton()
export class UserLogsTableModule extends TableModule<UserLog, never, never, { userId: string }> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<{ userId: string }>;

  constructor(
    @inject(UserLogsApi) private readonly _api: UserLogsApi,
    userId: string
  ) {
    super();
    this.pathParams = new PathParams<{ userId: string }>({ userId: userId });
  }

  protected async _getData(): Promise<TableDto<UserLog>> {
    return this._api.getUserLogs({ urlParams: { userId: this.pathParams.state.userId } });
  }
}
