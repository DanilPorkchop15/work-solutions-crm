import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  CustomerApi,
  CustomerBulkDeleteRequestDTO,
  CustomerCreateRequestDTO,
  CUSTOMERS_ROUTES,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";

import { CustomerService } from "./customer.service";

@Controller()
export class CustomerController implements CustomerApi {
  constructor(private readonly customersService: CustomerService) {}

  @Get(CUSTOMERS_ROUTES.findAll())
  findAll(): Promise<CustomerPreviewDTO[]> {
    return this.customersService.findAll();
  }

  @Get(CUSTOMERS_ROUTES.findOne(":customerId"))
  findOne(@Param("customerId") customerId: string): Promise<CustomerDTO> {
    return this.customersService.findOne(customerId);
  }

  @Post(CUSTOMERS_ROUTES.create())
  create(@Body() dto: CustomerCreateRequestDTO): Promise<void> {
    return this.customersService.create(dto);
  }

  @Patch(CUSTOMERS_ROUTES.update(":customerId"))
  update(@Param("customerId") customerId: string, @Body() dto: CustomerUpdateRequestDTO): Promise<void> {
    return this.customersService.update(customerId, dto);
  }

  @Delete(CUSTOMERS_ROUTES.delete(":customerId"))
  delete(@Param("customerId") customerId: string): Promise<void> {
    return this.customersService.delete(customerId);
  }

  @Patch(CUSTOMERS_ROUTES.restore(":customerId"))
  restore(@Param("customerId") customerId: string): Promise<void> {
    return this.customersService.restore(customerId);
  }

  @Delete(CUSTOMERS_ROUTES.bulkDelete())
  bulkDelete(@Body() dto: CustomerBulkDeleteRequestDTO): Promise<void> {
    return this.customersService.bulkDelete(dto);
  }

  @Patch(CUSTOMERS_ROUTES.bulkRestore())
  bulkRestore(@Body() dto: CustomerBulkDeleteRequestDTO): Promise<void> {
    return this.customersService.bulkRestore(dto);
  }
}
