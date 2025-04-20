import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../../shared/model/tableModule";
import { ProjectLogsApi } from "../../../api";
import type { ProjectLog } from "../../../interfaces";

@singleton()
export class ProjectLogsTableModule extends TableModule<ProjectLog, never, never, { projectId: string }> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<{ projectId: string }>;

  constructor(
    @inject(ProjectLogsApi) private readonly _api: ProjectLogsApi,
    projectId: string
  ) {
    super();
    this.pathParams = new PathParams<{ projectId: string }>({ projectId: projectId });
  }

  protected async _getData(): Promise<TableDto<ProjectLog>> {
    return this._api.getProjectLogs({ urlParams: { projectId: this.pathParams.state.projectId } });
  }
}
