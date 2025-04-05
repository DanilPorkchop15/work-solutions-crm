import {
  CustomerBulkDeleteRequestDTO,
  CustomerBulkRestoreRequestDTO,
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";

import { TableDto } from "../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../shared/model/interfaces/transport";

import type { Customer, CustomerPreview } from "./domain";

export type FindOneCustomerRequest = Request<{ urlParams: { id: string } }>;
export type CreateCustomerRequest = Request<{ body: CustomerCreateRequestDTO }>;
export type UpdateCustomerRequest = Request<{ urlParams: { id: string }; body: CustomerUpdateRequestDTO }>;
export type DeleteCustomerRequest = Request<{ urlParams: { id: string } }>;
export type RestoreCustomerRequest = Request<{ urlParams: { id: string } }>;

export type BulkDeleteCustomerRequest = Request<{ body: CustomerBulkDeleteRequestDTO }>;
export type BulkRestoreCustomerRequest = Request<{ body: CustomerBulkRestoreRequestDTO }>;

export interface CustomersTransport {
  getCustomer: Endpoint<FindOneCustomerRequest, Customer>;
  getCustomers: Endpoint<void, TableDto<CustomerPreview>>;
  createCustomer: Endpoint<CreateCustomerRequest, void>;
  updateCustomer: Endpoint<UpdateCustomerRequest, void>;
  deleteCustomer: Endpoint<DeleteCustomerRequest, void>;
  restoreCustomer: Endpoint<RestoreCustomerRequest, void>;
  bulkDeleteCustomer: Endpoint<BulkDeleteCustomerRequest, void>;
  bulkRestoreCustomer: Endpoint<BulkRestoreCustomerRequest, void>;
}
