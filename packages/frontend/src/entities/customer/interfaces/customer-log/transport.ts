import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { CustomerLog } from "./domain";

export type FindAllCustomerLogsRequest = Request<{ urlParams: { customerId: string } }>;

export interface CustomerLogsTransport {
  getCustomerLogs: Endpoint<FindAllCustomerLogsRequest, TableDto<CustomerLog>>;
} 