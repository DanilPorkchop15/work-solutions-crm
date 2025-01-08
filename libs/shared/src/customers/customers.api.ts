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
  findOne: () => CustomerDTO;
  create: (dto: CustomerCreateRequestDTO) => Promise<void>;
  update: (customerId: string, dto: CustomerUpdateRequestDTO) => Promise<void>;
  delete: (customerId: string) => Promise<void>;
  restore: (customerId: string) => Promise<void>;
}

export const CUSTOMERS_ROUTES: APIRoutes<CustomersApi> = {
  findAll: (customerId: string) => `/customers/${customerId}/comments`,
  create: (customerId: string, text: string) => `/customers/${customerId}/comments`,
  update: (customerCommentId: string, text: string) => `/customer-comments/${customerCommentId}`,
  delete: (customerCommentId: string) => `/customer-comments/${customerCommentId}`,
  restore: (customerCommentId: string) => `/customer-comments/${customerCommentId}/restore`
};
