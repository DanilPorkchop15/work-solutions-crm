import { AuthGuard } from "@backend/app/auth/auth.guard";
import { CustomerLogResponseDTO } from "@backend/app/customer-log/customer-log.dto";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CUSTOMER_LOGS_ROUTES, CustomerLogApi } from "@work-solutions-crm/libs/shared/customer-log/customer-log.api";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-log/customer-log.dto";

import { CustomerLogService } from "./customer-log.service";

@ApiTags("Customer Logs")
@ApiBearerAuth()
@Controller()
export class CustomerLogController implements CustomerLogApi {
  constructor(private readonly customerLogsService: CustomerLogService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all customer logs" })
  @ApiResponse({ status: 200, description: "List of customer logs", type: [CustomerLogResponseDTO] })
  @Get(CUSTOMER_LOGS_ROUTES.findAll(":customerId"))
  findAll(@Param("customerId") customerId: string): Promise<CustomerLogDTO[]> {
    return this.customerLogsService.findAll(customerId);
  }
}
