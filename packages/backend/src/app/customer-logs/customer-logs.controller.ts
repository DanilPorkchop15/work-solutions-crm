import { Controller, Get, Param } from "@nestjs/common";
import { CUSTOMER_LOGS_ROUTES, CustomerLogsApi } from "@work-solutions-crm/libs/shared/customer-logs/customer-logs.api";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-logs/customer-logs.dto";

@Controller()
export class CustomerLogsController implements CustomerLogsApi {
  @Get(CUSTOMER_LOGS_ROUTES.findAll(":customerId"))
  findAll(@Param("customerId") customerId: string): Promise<CustomerLogDTO[]> {
    // TODO
    return Promise.resolve([]);
  }
}
