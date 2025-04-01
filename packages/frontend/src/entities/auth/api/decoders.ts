import { userWithPermissionsDecoder } from "@frontend/entities/@common/user";
import Decoder, { field, string, succeed } from "jsonous";

import { LoginData } from "../interfaces/domain";

export const loginDataDecoder: Decoder<LoginData> = succeed({})
  .assign("user", field("user", userWithPermissionsDecoder))
  .assign("accessToken", field("access_token", string));
