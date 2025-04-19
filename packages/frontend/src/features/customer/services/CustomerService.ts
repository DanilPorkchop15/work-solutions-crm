import {
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { inject, singleton } from "tsyringe";

import { CustomersApi } from "../../../entities/customer";

@singleton()
export class CustomerService {
  constructor(@inject(CustomersApi) private readonly _api: CustomersApi) {}

  public async getOne(id: string) {
    return this._api.getCustomer({ urlParams: { id } });
  }

  public async getAll() {
    return this._api.getCustomers();
  }

  public async create(dto: CustomerCreateRequestDTO) {
    return this._api.createCustomer({ body: dto });
  }

  public async update(id: string, dto: CustomerUpdateRequestDTO) {
    return this._api.updateCustomer({ body: dto, urlParams: { id } });
  }

  public async delete(id: string) {
    return this._api.deleteCustomer({ urlParams: { id } });
  }

  public async restore(id: string) {
    return this._api.restoreCustomer({ urlParams: { id } });
  }

  public async bulkDelete(ids: string[]) {
    return this._api.bulkDeleteCustomer({ body: { customer_ids: ids } });
  }

  public async bulkRestore(ids: string[]) {
    return this._api.bulkRestoreCustomer({ body: { customer_ids: ids } });
  }
}
