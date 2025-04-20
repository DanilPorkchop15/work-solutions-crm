import { DocumentComment } from "@frontend/entities/document";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { userPreviewDecoder } from "../../../@common/user";

export const documentCommentDecoder: Decoder<DocumentComment> = succeed({})
  .assign("id", field("id", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("text", field("text", string))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));
