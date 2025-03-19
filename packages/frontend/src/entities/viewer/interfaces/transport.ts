import type { Endpoint } from "@frontend/shared/model/interfaces";

import type { Viewer } from "./domain";

export interface ViewerTransport {
  getProfile: Endpoint<void, Viewer>;
}
