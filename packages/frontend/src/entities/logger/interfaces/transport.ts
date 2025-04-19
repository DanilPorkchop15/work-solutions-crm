import { TableDto } from "../../../shared/model/interfaces/table";
import { Endpoint } from "../../../shared/model/interfaces/transport";

import type { Log } from "./domain";

export interface LoggerTransport {
  latest: Endpoint<void, TableDto<Log>>;
}
