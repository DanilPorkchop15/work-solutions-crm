import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";

import { userPreviewDecoder } from "../../@common/user/api/decoders";
import { Customer, CustomerPreview } from "../interfaces";

export const customerPreviewDecoder: Decoder<CustomerPreview> = succeed({})
  .assign("id", field("id", string))
  .assign("name", field("name", string))
  .assign("email", fieldOrFallback("email", string))
  .assign("userCreated", field("user_created", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));

export const customerDecoder: Decoder<Customer> = succeed({})
  .assign("id", field("id", string))
  .assign("name", field("name", string))
  .assign("email", fieldOrFallback("email", string))
  .assign("phone", fieldOrFallback("phone", string))
  .assign("inn", fieldOrFallback("inn", string))
  .assign("website", fieldOrFallback("website", string))
  .assign("userCreated", field("user_created", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));
