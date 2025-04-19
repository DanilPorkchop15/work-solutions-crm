import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { DocumentLog } from "../../interfaces";
import { documentPreviewDecoder } from "../document/decoders";

export const documentLogDecoder: Decoder<DocumentLog> = succeed({})
  .assign("id", field("id", string))
  .assign("action", field("action", string))
  .assign("comment", fieldOrFallback("comment", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("document", field("document", documentPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string)); 