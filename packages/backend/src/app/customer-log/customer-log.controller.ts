import { Controller, Get, Param } from "@nestjs/common";
import { CUSTOMER_LOGS_ROUTES, CustomerLogApi } from "@work-solutions-crm/libs/shared/customer-log/customer-log.api";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-log/customer-log.dto";

import { CustomerLogService } from "./customer-log.service";

@Controller()
export class CustomerLogController implements CustomerLogApi {
  constructor(private readonly customerLogsService: CustomerLogService) {}

  @Get(CUSTOMER_LOGS_ROUTES.findAll(":customerId"))
  findAll(@Param("customerId") customerId: string): Promise<CustomerLogDTO[]> {
    return this.customerLogsService.findAll(customerId);
  }
}
