import {
  DocumentCommentCreateRequestDTO,
  DocumentCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";

import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { DocumentComment } from "./domain";

export type FindAllDocumentCommentsRequest = Request<{ urlParams: { documentId: string } }>;
export type CreateDocumentCommentRequest = Request<{
  urlParams: { id: string };
  body: DocumentCommentCreateRequestDTO;
}>;
export type UpdateDocumentCommentRequest = Request<{
  urlParams: { id: string };
  body: DocumentCommentUpdateRequestDTO;
}>;
export type DeleteDocumentCommentRequest = Request<{ urlParams: { id: string } }>;
export type RestoreDocumentCommentRequest = Request<{ urlParams: { id: string } }>;

export interface DocumentCommentsTransport {
  getDocumentComments: Endpoint<FindAllDocumentCommentsRequest, TableDto<DocumentComment>>;
  createDocumentComment: Endpoint<CreateDocumentCommentRequest>;
  updateDocumentComment: Endpoint<UpdateDocumentCommentRequest>;
  deleteDocumentComment: Endpoint<DeleteDocumentCommentRequest>;
  restoreDocumentComment: Endpoint<RestoreDocumentCommentRequest>;
}
