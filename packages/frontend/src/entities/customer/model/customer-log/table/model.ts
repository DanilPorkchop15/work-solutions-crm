import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../../shared/model/tableModule";
import { CustomerLogsApi } from "../../../api";
import type { CustomerLog } from "../../../interfaces";

@singleton()
export class CustomerLogsTableModule extends TableModule<CustomerLog, never, never, { customerId: string }> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<{ customerId: string }>;

  constructor(
    @inject(CustomerLogsApi) private readonly _api: CustomerLogsApi,
    customerId: string
  ) {
    super();
    this.pathParams = new PathParams<{ customerId: string }>({ customerId: customerId });
  }

  protected async _getData(): Promise<TableDto<CustomerLog>> {
    return this._api.getCustomerLogs({ urlParams: { customerId: this.pathParams.state.customerId } });
  }
} 