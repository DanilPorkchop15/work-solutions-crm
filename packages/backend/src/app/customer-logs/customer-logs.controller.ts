import { Controller, Get, Param } from "@nestjs/common";
import { CUSTOMER_LOGS_ROUTES, CustomerLogsApi } from "@work-solutions-crm/libs/shared/customer-logs/customer-logs.api";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-logs/customer-logs.dto";

import { CustomerLogsService } from "./customer-logs.service";

@Controller()
export class CustomerLogsController implements CustomerLogsApi {
  constructor(private readonly customerLogsService: CustomerLogsService) {}

  @Get(CUSTOMER_LOGS_ROUTES.findAll(":customerId"))
  findAll(@Param("customerId") customerId: string): Promise<CustomerLogDTO[]> {
    return this.customerLogsService.findAll(customerId);
  }
}
