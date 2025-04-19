import {
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";
import { inject, singleton } from "tsyringe";

import { DocumentsApi } from "../../../entities/document";

@singleton()
export class DocumentService {
  constructor(@inject(DocumentsApi) private readonly _api: DocumentsApi) {}

  public async getOne(id: string) {
    return this._api.getDocument({ urlParams: { id } });
  }

  public async getAll() {
    return this._api.getDocuments();
  }

  public async create(dto: DocumentCreateRequestDTO) {
    return this._api.createDocument({ body: dto });
  }

  public async update(id: string, dto: DocumentUpdateRequestDTO) {
    return this._api.updateDocument({ urlParams: { id }, body: dto });
  }

  public async delete(id: string) {
    return this._api.deleteDocument({ urlParams: { id } });
  }

  public async restore(id: string) {
    return this._api.restoreDocument({ urlParams: { id } });
  }

  public async bulkDelete(ids: string[]) {
    return this._api.bulkDeleteDocument({ body: { document_ids: ids } });
  }

  public async bulkRestore(ids: string[]) {
    return this._api.bulkRestoreDocument({ body: { document_ids: ids } });
  }
}
