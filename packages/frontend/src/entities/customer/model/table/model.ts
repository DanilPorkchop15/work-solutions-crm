import { inject, injectable } from "tsyringe";

import { FilterParams } from "../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../shared/model/tableModule";
import { CustomersApi } from "../../api/gateway";
import type { CustomerPreview } from "../../interfaces";

@injectable()
export class CustomersTableModule extends TableModule<CustomerPreview, never, never> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<Record<string, never>>;

  constructor(@inject(CustomersApi) private readonly _api: CustomersApi) {
    super();
    this.pathParams = new PathParams<Record<string, never>>({});
  }

  protected async _getData(): Promise<TableDto<CustomerPreview>> {
    return this._api.getCustomers();
  }
}
