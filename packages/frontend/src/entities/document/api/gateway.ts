// eslint-disable-next-line @nx/enforce-module-boundaries
import { tableDecoder } from "@frontend/shared/api";
import { DOCUMENTS_ROUTES } from "@work-solutions-crm/libs/shared/document/document.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../shared/lib/requestManager";
import { TableDto } from "../../../shared/model/interfaces/table";
import type {
  BulkDeleteDocumentRequest,
  BulkRestoreDocumentRequest,
  CreateDocumentRequest,
  DeleteDocumentRequest,
  Document,
  DocumentPreview,
  DocumentsTransport,
  FindOneDocumentRequest,
  RestoreDocumentRequest,
  UpdateDocumentRequest
} from "../interfaces";

import { documentDecoder, documentPreviewDecoder } from "./decoders";

@singleton()
export class DocumentsApi extends RequestManager implements DocumentsTransport {
  public async getDocuments(): Promise<TableDto<DocumentPreview>> {
    return this.createRequest({
      url: DOCUMENTS_ROUTES.findAll(),
      serverDataDecoder: tableDecoder(documentPreviewDecoder)
    })();
  }

  public async getDocument(request: FindOneDocumentRequest): Promise<Document> {
    return this.createRequest({
      url: DOCUMENTS_ROUTES.findOne(request.urlParams.id),
      serverDataDecoder: documentDecoder
    })(request);
  }

  public async createDocument(request: CreateDocumentRequest): Promise<Document> {
    return this.createRequest({
      method: METHODS.POST,
      url: DOCUMENTS_ROUTES.create(),
      serverDataDecoder: documentDecoder
    })(request);
  }

  public async updateDocument(request: UpdateDocumentRequest): Promise<Document> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: DOCUMENTS_ROUTES.update(request.urlParams.id),
      serverDataDecoder: documentDecoder
    })(request);
  }

  public async deleteDocument(request: DeleteDocumentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: DOCUMENTS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreDocument(request: RestoreDocumentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: DOCUMENTS_ROUTES.restore(request.urlParams.id)
    })(request);
  }

  public async bulkDeleteDocument(request: BulkDeleteDocumentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: DOCUMENTS_ROUTES.bulkDelete()
    })(request);
  }

  public async bulkRestoreDocument(request: BulkRestoreDocumentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: DOCUMENTS_ROUTES.bulkRestore()
    })(request);
  }
}
