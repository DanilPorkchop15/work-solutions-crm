import { APIRoutes } from "../api-routes";

import { CustomerLogDTO } from "./customer-logs.dto";

export interface CustomerLogsApi {
  findAll: (customerId: string) => Promise<CustomerLogDTO[]>;
}

export const CUSTOMER_LOGS_ROUTES: APIRoutes<CustomerLogsApi> = {
  findAll: (customerId: string) => `/customers/${customerId}/logs`
};
