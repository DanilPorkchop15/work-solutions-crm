import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import {
  CustomerCreateRequestDTO,
  CUSTOMERS_ROUTES,
  CustomersApi,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customers/customers.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customers/customers.dto";

@Controller() // No base route since CUSTOMERS_ROUTES handles path definitions
export class CustomersController implements CustomersApi {
  @Get(CUSTOMERS_ROUTES.findAll())
  findAll(@Query("filter") filter?: string): Promise<CustomerPreviewDTO[]> {
    // TODO: Add service call for fetching all customers with optional filtering
    return Promise.resolve([]);
  }

  @Get(CUSTOMERS_ROUTES.findOne(":customerId"))
  findOne(@Param("customerId") customerId: string): CustomerDTO {
    // TODO: Add service call to fetch a specific customer by ID
    return undefined;
  }

  @Post(CUSTOMERS_ROUTES.create())
  create(@Body() dto: CustomerCreateRequestDTO): Promise<void> {
    // TODO: Add service call to create a new customer
    return Promise.resolve(undefined);
  }

  @Patch(CUSTOMERS_ROUTES.update(":customerId"))
  update(@Param("customerId") customerId: string, @Body() dto: CustomerUpdateRequestDTO): Promise<void> {
    // TODO: Add service call to update a specific customer by ID
    return Promise.resolve(undefined);
  }

  @Delete(CUSTOMERS_ROUTES.delete(":customerId"))
  delete(@Param("customerId") customerId: string): Promise<void> {
    // TODO: Add service call to delete a specific customer by ID
    return Promise.resolve(undefined);
  }

  @Patch(CUSTOMERS_ROUTES.restore(":customerId"))
  restore(@Param("customerId") customerId: string): Promise<void> {
    // TODO: Add service call to restore a specific customer by ID
    return Promise.resolve(undefined);
  }
}
