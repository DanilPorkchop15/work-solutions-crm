import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { type UserLog } from "../../interfaces";

export const userLogDecoder: Decoder<UserLog> = succeed({})
  .assign("id", field("id", string))
  .assign("action", field("avatar_url", string))
  .assign("comment", field("full_name", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));
