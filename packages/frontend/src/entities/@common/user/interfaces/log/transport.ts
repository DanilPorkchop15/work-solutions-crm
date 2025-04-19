import { TableDto } from "../../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../../shared/model/interfaces/transport";

import type { UserLog } from "./domain";

export type FindAllUserLogsRequest = Request<{ urlParams: { userId: string } }>;

export interface UserLogsTransport {
  getUserLogs: Endpoint<FindAllUserLogsRequest, TableDto<UserLog>>;
}
