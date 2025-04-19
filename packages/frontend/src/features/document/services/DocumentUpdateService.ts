import { Document, DocumentsApi } from "@frontend/entities/document";
import { DocumentDetailsService } from "@frontend/entities/document/model/document";
import { DocumentUpdateRequestDTO } from "@work-solutions-crm/libs/shared/document/document.api";
import { inject, singleton } from "tsyringe";

@singleton()
export class DocumentUpdateService {
  constructor(
    @inject(DocumentsApi) private readonly _api: DocumentsApi,
    @inject(DocumentDetailsService) private readonly _documentDetailsService: DocumentDetailsService
  ) {}

  public get documentDetails(): Document {
    const details: Document | null = this._documentDetailsService.documentDetails;
    if (!details) throw new Error("Document details not loaded");
    return details;
  }

  public async update(dto: DocumentUpdateRequestDTO): Promise<void> {
    const id: string = this.documentDetails.id;
    await this._api.updateDocument({ urlParams: { id }, body: dto });
    await this._documentDetailsService.loadDocumentDetails({ urlParams: { id } });
  }
}
