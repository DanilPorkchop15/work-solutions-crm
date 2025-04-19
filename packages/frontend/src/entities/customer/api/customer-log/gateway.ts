import { RequestManager } from "@frontend/shared/lib/requestManager";
import { TableDto } from "@frontend/shared/model/interfaces";
import { CUSTOMER_LOGS_ROUTES } from "@work-solutions-crm/libs/shared/customer-log/customer-log.api";
import { singleton } from "tsyringe";

import { tableDecoder } from "../../../../shared/api";
import { CustomerLog, CustomerLogsTransport, FindAllCustomerLogsRequest } from "../../interfaces";

import { customerLogDecoder } from "./decoder";

@singleton()
export class CustomerLogsApi extends RequestManager implements CustomerLogsTransport {
  public async getCustomerLogs(request: FindAllCustomerLogsRequest): Promise<TableDto<CustomerLog>> {
    return this.createRequest({
      url: CUSTOMER_LOGS_ROUTES.findAll(request.urlParams.customerId),
      serverDataDecoder: tableDecoder(customerLogDecoder)
    })(request);
  }
} 