import { UserLog, userPreviewDecoder } from "@frontend/entities/@common/user";
import { fieldOrFallback } from "@frontend/shared/api";
import Decoder, { field, string, succeed } from "jsonous";
import { CustomerLog } from "../../interfaces";
import { customerPreviewDecoder } from "../customer/decoders";


export const customerLogDecoder: Decoder<CustomerLog> = succeed({})
  .assign("id", field("id", string))
  .assign("action", field("action", string))
  .assign("comment", fieldOrFallback("comment", string))
  .assign("user", field("user", userPreviewDecoder))
  .assign("customer", field("customer", customerPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));