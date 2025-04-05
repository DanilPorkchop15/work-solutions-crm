import { enumDecoder, fieldOrFallback } from "@frontend/shared/api";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import Decoder, { field, string, succeed } from "jsonous";

import { ImportedUserRow } from "../interfaces";

export const importedUserRowDecoder: Decoder<ImportedUserRow> = succeed({})
  .assign("fullName", field("fullName", string))
  .assign("email", field("email", string))
  .assign("password", fieldOrFallback("password", string))
  .assign("position", fieldOrFallback("position", string))
  .assign("role", fieldOrFallback("role", enumDecoder(Role)));
