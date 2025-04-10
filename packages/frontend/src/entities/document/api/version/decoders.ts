import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { DocumentVersion } from "@frontend/entities/document";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, number, string, succeed } from "jsonous";

export const documentVersionDecoder: Decoder<DocumentVersion> = succeed({})
  .assign("id", field("id", string))
  .assign("documentUrl", field("document_url", string))
  .assign("version", field("version", number))
  .assign("userCreated", field("user_created", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));
