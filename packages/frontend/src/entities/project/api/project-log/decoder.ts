import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { ProjectLog } from "../../interfaces";
import { projectPreviewDecoder } from "../project/decoders";

export const projectLogDecoder: Decoder<ProjectLog> = succeed({})
  .assign("id", field("id", string))
  .assign("action", field("action", string))
  .assign("comment", fieldOrFallback("comment", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("project", field("project", projectPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string)); 