import { AuthGuard } from "@backend/app/auth/auth.guard";
import {
  CustomerCreateValidationDTO,
  CustomerPreviewResponseDTO,
  CustomerResponseDTO,
  CustomerUpdateValidationDTO
} from "@backend/app/customer/customer.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CustomerApi,
  CustomerBulkDeleteRequestDTO,
  CUSTOMERS_ROUTES,
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";

import { CustomerService } from "./customer.service";

@ApiTags("Customers")
@ApiBearerAuth()
@Controller()
export class CustomerController implements CustomerApi {
  constructor(private readonly customersService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Get(CUSTOMERS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all customers" })
  @ApiResponse({ status: 200, description: "List of customers", type: [CustomerPreviewResponseDTO] })
  findAll(): Promise<CustomerPreviewDTO[]> {
    return this.customersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(CUSTOMERS_ROUTES.findOne(":customerId"))
  @ApiOperation({ summary: "Retrieve a customer by ID" })
  @ApiResponse({ status: 200, description: "Customer details", type: CustomerResponseDTO })
  @ApiResponse({ status: 404, description: "Customer not found" })
  findOne(@Param("customerId") customerId: string): Promise<CustomerDTO> {
    return this.customersService.findOne(customerId);
  }

  @UseGuards(AuthGuard)
  @Post(CUSTOMERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new customer" })
  @ApiResponse({ status: 201, description: "Customer created successfully" })
  create(@Body() dto: CustomerCreateValidationDTO): Promise<void> {
    return this.customersService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch(CUSTOMERS_ROUTES.update(":customerId"))
  @ApiOperation({ summary: "Update an existing customer" })
  @ApiResponse({ status: 200, description: "Customer updated successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  update(@Param("customerId") customerId: string, @Body() dto: CustomerUpdateValidationDTO): Promise<void> {
    return this.customersService.update(customerId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(CUSTOMERS_ROUTES.delete(":customerId"))
  @ApiOperation({ summary: "Delete a customer" })
  @ApiResponse({ status: 200, description: "Customer deleted successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  delete(@Param("customerId") customerId: string): Promise<void> {
    return this.customersService.delete(customerId);
  }

  @UseGuards(AuthGuard)
  @Patch(CUSTOMERS_ROUTES.restore(":customerId"))
  @ApiOperation({ summary: "Restore a deleted customer" })
  @ApiResponse({ status: 200, description: "Customer restored successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
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
