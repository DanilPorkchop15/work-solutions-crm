import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

import { DocumentsApi } from "../../../api";
import type { Document, FindOneDocumentRequest } from "../../../interfaces";

@singleton()
export class DocumentDetailsService {
  private _documentDetailsModel: Document | null = null;

  constructor(@inject(DocumentsApi) private readonly _api: DocumentsApi) {
    makeAutoObservable(this);
  }

  public get documentDetails(): Document | null {
    return this._documentDetailsModel;
  }

  public async loadDocumentDetails({ urlParams }: FindOneDocumentRequest): Promise<void> {
    this._documentDetailsModel = await this._api.getDocument({ urlParams });
  }
}
