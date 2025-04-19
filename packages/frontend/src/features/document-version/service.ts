import { DocumentVersionsApi } from "@frontend/entities/document";
import { RcFile } from "antd/es/upload";
import { inject, singleton } from "tsyringe";

@singleton()
export class DocumentVersionsService {
  constructor(@inject(DocumentVersionsApi) private readonly _api: DocumentVersionsApi) {}

  public async upload(documentId: string, file: RcFile): Promise<void> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    await this._api.uploadVersion({ urlParams: { documentId }, body: formData });
  }
}
