import { Endpoint } from "../../../shared/model/interfaces/transport";

import type { Stats } from "./domain";

export interface StatsTransport {
  getStats: Endpoint<void, Stats>;
}
