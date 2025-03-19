import { userWithPermissionsDecoder } from "@frontend/entities/@common/user";
import { LoginData } from "@frontend/entities/auth/interfaces";
import Decoder, { field, string, succeed } from "jsonous";

export const loginDataDecoder: Decoder<LoginData> = succeed({})
  .assign("user", field("user", userWithPermissionsDecoder))
  .assign("accessToken", field("access_token", string));
