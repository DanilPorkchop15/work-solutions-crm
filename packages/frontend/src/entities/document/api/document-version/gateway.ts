import { tableDecoder } from "@frontend/shared/api";
import { DOCUMENT_VERSIONS_ROUTES } from "@work-solutions-crm/libs/shared/document-version/document-version.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../../shared/lib/requestManager";
import { TableDto } from "../../../../shared/model/interfaces/table";
import {
  DocumentFindAllVersionsRequest,
  DocumentVersion,
  DocumentVersionsTransport,
  DocumentVersionUploadRequest
} from "../../interfaces";

import { documentVersionDecoder } from "./decoders";

@singleton()
export class DocumentVersionsApi extends RequestManager implements DocumentVersionsTransport {
  public async getDocumentVersions(request: DocumentFindAllVersionsRequest): Promise<TableDto<DocumentVersion>> {
    return this.createRequest({
      url: DOCUMENT_VERSIONS_ROUTES.findAll(request.urlParams.documentId),
      serverDataDecoder: tableDecoder(documentVersionDecoder)
    })();
  }

  public async uploadVersion(request: DocumentVersionUploadRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.POST,
      url: DOCUMENT_VERSIONS_ROUTES.upload(request.urlParams.documentId)
    })(request);
  }
}
