import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { Log } from "../interfaces";

export const logDecoder: Decoder<Log> = succeed({})
  .assign("id", field("id", string))
  .assign("type", field("type", string))
  .assign("action", field("action", string))
  .assign("comment", field("comment", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));
