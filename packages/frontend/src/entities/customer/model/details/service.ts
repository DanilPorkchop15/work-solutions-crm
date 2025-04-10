import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

import { CustomersApi } from "../../api";
import type { Customer, FindOneCustomerRequest } from "../../interfaces";

@singleton()
export class CustomerDetailsService {
  private _customerDetailsModel: Customer | null = null;

  constructor(@inject(CustomersApi) private readonly _api: CustomersApi) {
    makeAutoObservable(this);
  }

  public get customerDetails(): Customer | null {
    return this._customerDetailsModel;
  }

  public async loadCustomerDetails({ urlParams }: FindOneCustomerRequest): Promise<void> {
    this._customerDetailsModel = await this._api.getCustomer({ urlParams });
  }
}
