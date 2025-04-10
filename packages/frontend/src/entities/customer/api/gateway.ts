import { tableDecoder } from "@frontend/shared/api";
import { CUSTOMERS_ROUTES } from "@work-solutions-crm/libs/shared/customer/customer.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../shared/model/interfaces/table";
import type {
  BulkDeleteCustomerRequest,
  BulkRestoreCustomerRequest,
  CreateCustomerRequest,
  Customer,
  CustomerPreview,
  CustomersTransport,
  DeleteCustomerRequest,
  FindOneCustomerRequest,
  RestoreCustomerRequest,
  UpdateCustomerRequest
} from "../interfaces";

import { customerDecoder, customerPreviewDecoder } from "./decoders";

@singleton()
export class CustomersApi extends RequestManager implements CustomersTransport {
  public async getCustomers(): Promise<TableDto<CustomerPreview>> {
    return this.createRequest({
      url: CUSTOMERS_ROUTES.findAll(),
      serverDataDecoder: tableDecoder(customerPreviewDecoder)
    })();
  }

  public async getCustomer(request: FindOneCustomerRequest): Promise<Customer> {
    return this.createRequest({
      url: CUSTOMERS_ROUTES.findOne(request.urlParams.id),
      serverDataDecoder: customerDecoder
    })(request);
  }

  public async createCustomer(request: CreateCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.POST,
      url: CUSTOMERS_ROUTES.create()
    })(request);
  }

  public async bulkDeleteCustomer(request: BulkDeleteCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: CUSTOMERS_ROUTES.bulkDelete()
    })(request);
  }

  public async bulkRestoreCustomer(request: BulkRestoreCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: CUSTOMERS_ROUTES.bulkRestore()
    })(request);
  }

  public async deleteCustomer(request: DeleteCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: CUSTOMERS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreCustomer(request: RestoreCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: CUSTOMERS_ROUTES.restore(request.urlParams.id)
    })(request);
  }

  public async updateCustomer(request: UpdateCustomerRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: CUSTOMERS_ROUTES.update(request.urlParams.id)
    })(request);
  }
}
