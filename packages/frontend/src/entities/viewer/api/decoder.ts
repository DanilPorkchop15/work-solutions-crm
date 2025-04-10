import { userWithPermissionsDecoder } from "@frontend/entities/@common/user";
import type Decoder from "jsonous";

import type { Viewer } from "../interfaces";

export const profileDecoder: Decoder<Viewer> = userWithPermissionsDecoder;
