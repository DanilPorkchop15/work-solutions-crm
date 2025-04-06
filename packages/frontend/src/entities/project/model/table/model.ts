import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../shared/model/tableModule";
import { ProjectsApi } from "../../api/gateway";
import type { ProjectPreview } from "../../interfaces";

@singleton()
export class ProjectsTableModule extends TableModule<ProjectPreview, never, never> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<Record<string, never>>;

  constructor(@inject(ProjectsApi) private readonly _api: ProjectsApi) {
    super();
    this.pathParams = new PathParams<Record<string, never>>({});
  }

  protected async _getData(): Promise<TableDto<ProjectPreview>> {
    return this._api.getProjects();
  }
}
