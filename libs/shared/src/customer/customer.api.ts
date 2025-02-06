import { APIRoutes } from "../api-routes";

import { CustomerDTO, CustomerPreviewDTO } from "./customer.dto";

export interface CustomerCreateRequestDTO {
  name: string;
  email?: string;
  phone?: string;
  inn?: string;
  website?: string;
}

export type CustomerUpdateRequestDTO = Partial<CustomerCreateRequestDTO>;

export interface CustomerBulkDeleteRequestDTO {
  customer_ids: string[];
}

export type CustomerBulkRestoreRequestDTO = CustomerBulkDeleteRequestDTO;

export interface CustomerApi {
  findAll: () => Promise<CustomerPreviewDTO[]>;
  findOne: (customerId: string) => Promise<CustomerDTO>;
  create: (dto: CustomerCreateRequestDTO, ...omitted: never) => Promise<void>;
  update: (customerId: string, dto: CustomerUpdateRequestDTO, ...omitted: never) => Promise<void>;
  delete: (customerId: string, ...omitted: never) => Promise<void>;
  restore: (customerId: string, ...omitted: never) => Promise<void>;
  bulkDelete: (dto: CustomerBulkDeleteRequestDTO, ...omitted: never) => Promise<void>;
  bulkRestore: (dto: CustomerBulkRestoreRequestDTO, ...omitted: never) => Promise<void>;
}

export const CUSTOMERS_ROUTES: APIRoutes<CustomerApi> = {
  findAll: () => `/customers`,
  findOne: (customerId: string) => `/customers/${customerId}`,
  create: () => `/customers`,
  update: (customerId: string) => `/customers/${customerId}`,
  delete: (customerId: string) => `/customers/${customerId}`,
  restore: (customerId: string) => `/customers/${customerId}/restore`,
  bulkDelete: () => `/customers/bulk-delete`,
  bulkRestore: () => `/customers/bulk-restore`
};
