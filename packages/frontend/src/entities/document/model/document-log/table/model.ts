import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../../shared/model/tableModule";
import { DocumentLogsApi } from "../../../api";
import type { DocumentLog } from "../../../interfaces";

@singleton()
export class DocumentLogsTableModule extends TableModule<DocumentLog, never, never, { documentId: string }> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<{ documentId: string }>;

  constructor(
    @inject(DocumentLogsApi) private readonly _api: DocumentLogsApi,
    documentId: string
  ) {
    super();
    this.pathParams = new PathParams<{ documentId: string }>({ documentId: documentId });
  }

  protected async _getData(): Promise<TableDto<DocumentLog>> {
    return this._api.getDocumentLogs({ urlParams: { documentId: this.pathParams.state.documentId } });
  }
} 