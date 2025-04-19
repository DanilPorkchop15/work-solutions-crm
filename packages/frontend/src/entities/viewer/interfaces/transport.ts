import { Endpoint } from "../../../shared/model/interfaces/transport";

import type { Viewer } from "./domain";

export interface ViewerTransport {
  getProfile: Endpoint<void, Viewer>;
}
