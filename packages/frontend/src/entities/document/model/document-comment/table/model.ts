import { inject, singleton } from "tsyringe";

import { FilterParams } from "../../../../../shared/model/additionalRequestParams/filterParams";
import { PaginationParams } from "../../../../../shared/model/additionalRequestParams/paginationParams";
import { PathParams } from "../../../../../shared/model/additionalRequestParams/pathParams";
import { SortingParams } from "../../../../../shared/model/additionalRequestParams/sortingParams";
import { TableDto } from "../../../../../shared/model/interfaces/table";
import { TableModule } from "../../../../../shared/model/tableModule";
import { DocumentCommentsApi } from "../../../api/document-comment";
import type { DocumentComment } from "../../../interfaces/document-comment";

@singleton()
export class DocumentCommentsTableModule extends TableModule<DocumentComment, never, never, { documentId: string }> {
  public readonly filter: FilterParams<never> = new FilterParams<never>(undefined as never);

  public readonly sorting: SortingParams<never> = new SortingParams<never>();

  public readonly pagination: PaginationParams = new PaginationParams({ pageIndex: 1, pageSize: 10 });

  public pathParams: PathParams<{ documentId: string }>;

  constructor(
    @inject(DocumentCommentsApi) private readonly _api: DocumentCommentsApi,
    documentId: string
  ) {
    super();
    this.pathParams = new PathParams<{ documentId: string }>({ documentId: documentId });
  }

  protected async _getData(): Promise<TableDto<DocumentComment>> {
    return this._api.getDocumentComments({ urlParams: { documentId: this.pathParams.state.documentId } });
  }
} 