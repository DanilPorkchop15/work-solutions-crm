import { Customer, CustomersApi } from "@frontend/entities/customer";
import { CustomerDetailsService } from "@frontend/entities/customer/model";
import { CustomerUpdateRequestDTO } from "@work-solutions-crm/libs/shared/customer/customer.api";
import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

@singleton()
export class CustomerUpdateService {
  constructor(
    @inject(CustomersApi) private readonly _api: CustomersApi,
    @inject(CustomerDetailsService) private readonly _customerDetailsService: CustomerDetailsService
  ) {
    makeAutoObservable(this);
  }

  public get customerDetails(): Customer {
    const customerDetails: Customer | null = this._customerDetailsService.customerDetails;

    if (!customerDetails) {
      throw new Error("CustomerDetailsService not found");
    }
    return customerDetails;
  }

  public async update(dto: CustomerUpdateRequestDTO): Promise<void> {
    const id: string = this.customerDetails.id;

    await this._api.updateCustomer({ urlParams: { id }, body: dto });
    await this._customerDetailsService.loadCustomerDetails({ urlParams: { id } });
  }
}
