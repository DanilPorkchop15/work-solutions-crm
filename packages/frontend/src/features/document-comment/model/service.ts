import { inject, singleton } from "tsyringe";

import { DocumentCommentsApi } from "../../../entities/document/api/document-comment";

@singleton()
export class DocumentCommentService {
  constructor(
    @inject(DocumentCommentsApi) private readonly _api: DocumentCommentsApi
  ) {}

  public async createComment(documentId: string, text: string): Promise<void> {
    await this._api.createDocumentComment({
      urlParams: { id: documentId },
      body: { text }
    });
  }

  public async updateComment(commentId: string, text: string): Promise<void> {
    await this._api.updateDocumentComment({
      urlParams: { id: commentId },
      body: { text }
    });
  }

  public async deleteComment(commentId: string): Promise<void> {
    await this._api.deleteDocumentComment({
      urlParams: { id: commentId }
    });
  }

  public async restoreComment(commentId: string): Promise<void> {
    await this._api.restoreDocumentComment({
      urlParams: { id: commentId }
    });
  }
} 