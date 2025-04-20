import { tableDecoder } from "@frontend/shared/api";
import { DOCUMENT_COMMENTS_ROUTES } from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../../shared/model/interfaces/table";
import type {
  CreateDocumentCommentRequest,
  DeleteDocumentCommentRequest,
  DocumentComment,
  DocumentCommentsTransport,
  FindAllDocumentCommentsRequest,
  RestoreDocumentCommentRequest,
  UpdateDocumentCommentRequest
} from "../../interfaces";

import { documentCommentDecoder } from "./decoders";

@singleton()
export class DocumentCommentsApi extends RequestManager implements DocumentCommentsTransport {
  public async getDocumentComments(request: FindAllDocumentCommentsRequest): Promise<TableDto<DocumentComment>> {
    return this.createRequest({
      url: DOCUMENT_COMMENTS_ROUTES.findAll(request.urlParams.documentId),
      serverDataDecoder: tableDecoder(documentCommentDecoder)
    })(request);
  }

  public async createDocumentComment(request: CreateDocumentCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.POST,
      url: DOCUMENT_COMMENTS_ROUTES.create(request.urlParams.id)
    })(request);
  }

  public async updateDocumentComment(request: UpdateDocumentCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: DOCUMENT_COMMENTS_ROUTES.update(request.urlParams.id)
    })(request);
  }

  public async deleteDocumentComment(request: DeleteDocumentCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: DOCUMENT_COMMENTS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreDocumentComment(request: RestoreDocumentCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: DOCUMENT_COMMENTS_ROUTES.restore(request.urlParams.id)
    })(request);
  }
}
