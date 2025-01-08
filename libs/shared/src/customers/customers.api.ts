import { APIRoutes } from "../api-routes";

import { CustomerDTO, CustomerPreviewDTO } from "./customers.dto";

export interface CustomerCreateRequestDTO {
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  inn?: string;
  website?: string;
}

export type CustomerUpdateRequestDTO = Partial<CustomerCreateRequestDTO>;

export interface CustomersApi {
  findAll: () => Promise<CustomerPreviewDTO[]>;
  findOne: (customerId: string) => CustomerDTO;
  create: (dto: CustomerCreateRequestDTO) => Promise<void>;
  update: (customerId: string, dto: CustomerUpdateRequestDTO) => Promise<void>;
  delete: (customerId: string) => Promise<void>;
  restore: (customerId: string) => Promise<void>;
}

export const CUSTOMERS_ROUTES: APIRoutes<CustomersApi> = {
  findAll: () => `/customers`,
  findOne: (customerId: string) => `/customers/${customerId}`,
  create: () => `/customers`,
  update: (customerId: string) => `/customers/${customerId}`,
  delete: (customerId: string) => `/customers/${customerId}`,
  restore: (customerId: string) => `/customers/${customerId}/restore`
};
