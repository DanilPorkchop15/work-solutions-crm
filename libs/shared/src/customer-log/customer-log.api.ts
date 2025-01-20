import { APIRoutes } from "../api-routes";

import { CustomerLogDTO } from "./customer-log.dto";

export interface CustomerLogApi {
  findAll: (customerId: string) => Promise<CustomerLogDTO[]>;
}

export const CUSTOMER_LOGS_ROUTES: APIRoutes<CustomerLogApi> = {
  findAll: (customerId: string) => `/customers/${customerId}/logs`
};
