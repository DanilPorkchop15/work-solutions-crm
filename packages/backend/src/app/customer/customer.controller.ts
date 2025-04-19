import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { CustomerApi, CUSTOMERS_ROUTES } from "@work-solutions-crm/libs/shared/customer/customer.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";

import { CheckPolicies } from "../../decorators/check-policies.decorator";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { Logger } from "../../decorators/logger.decorator";
import { Customer } from "../../models/entities/customer.entity";
import { User } from "../../models/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { LoggerService } from "../logger/logger.service";
import { LogType } from "../logger/logger.types";
import { CaslGuard } from "../permission/casl.guard";

import {
  CustomerBulkDeleteValidationDTO,
  CustomerBulkRestoreValidationDTO,
  CustomerCreateValidationDTO,
  CustomerPreviewResponseDTO,
  CustomerResponseDTO,
  CustomerUpdateValidationDTO
} from "./customer.dto";
import { CustomerService } from "./customer.service";

@ApiTags("Customers")
@ApiBearerAuth()
@Controller()
export class CustomerController implements CustomerApi {
  constructor(
    private readonly customersService: CustomerService,
    private readonly loggerService: LoggerService
  ) {}

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.CUSTOMERS))
  @Get(CUSTOMERS_ROUTES.findAll())
  @ApiOperation({ summary: "Retrieve all customers" })
  @ApiResponse({ status: 200, description: "List of customers", type: [CustomerPreviewResponseDTO] })
  @Logger("findAll", "customer")
  findAll(): Promise<CustomerPreviewDTO[]> {
    return this.customersService.findAll();
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.READ, Subject.CUSTOMERS))
  @Get(CUSTOMERS_ROUTES.findOne(":customerId"))
  @ApiOperation({ summary: "Retrieve a customer by ID" })
  @ApiResponse({ status: 200, description: "Customer details", type: CustomerResponseDTO })
  @ApiResponse({ status: 404, description: "Customer not found" })
  @Logger("findOne", "customer")
  findOne(@Param("customerId") customerId: string): Promise<CustomerDTO> {
    return this.customersService.findOne(customerId);
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.CREATE, Subject.CUSTOMERS))
  @Post(CUSTOMERS_ROUTES.create())
  @ApiOperation({ summary: "Create a new customer" })
  @ApiResponse({ status: 201, description: "Customer created successfully" })
  async create(@Body() dto: CustomerCreateValidationDTO, @CurrentUser() user: User): Promise<void> {
    const customer: Customer = await this.customersService.create(dto, user);
    await this.loggerService.logByType(LogType.CUSTOMER, "создан", `Клиент был создан (${customer.customer_id})`, {
      customer_id: customer.customer_id,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.CUSTOMERS))
  @Patch(CUSTOMERS_ROUTES.bulkRestore())
  @ApiOperation({ summary: "Bulk restore customers" })
  @ApiResponse({ status: 200, description: "Customers restored successfully" })
  @ApiBody({ type: CustomerBulkRestoreValidationDTO })
  async bulkRestore(@Body() dto: CustomerBulkRestoreValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.customersService.bulkRestore(dto);
    for (const id of dto.customer_ids) {
      await this.loggerService.logByType(
        LogType.CUSTOMER,
        "массово восстановлен",
        `Клиент был восстановлен в ходе массового восстановления (${id})`,
        {
          customer_id: id,
          user_id: user.user_id
        }
      );
    }
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.CUSTOMERS))
  @Patch(CUSTOMERS_ROUTES.update(":customerId"))
  @ApiOperation({ summary: "Update an existing customer" })
  @ApiResponse({ status: 200, description: "Customer updated successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async update(
    @Param("customerId") customerId: string,
    @Body() dto: CustomerUpdateValidationDTO,
    @CurrentUser() user: User
  ): Promise<void> {
    await this.customersService.update(customerId, dto, user);
    await this.loggerService.logByType(LogType.CUSTOMER, "обновлен", `Клиент был обновлен (${customerId})`, {
      customer_id: customerId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.CUSTOMERS))
  @Delete(CUSTOMERS_ROUTES.bulkDelete())
  @ApiOperation({ summary: "Bulk delete customers" })
  @ApiResponse({ status: 200, description: "Customers deleted successfully" })
  @ApiBody({ type: CustomerBulkDeleteValidationDTO })
  async bulkDelete(@Body() dto: CustomerBulkDeleteValidationDTO, @CurrentUser() user: User): Promise<void> {
    await this.customersService.bulkDelete(dto);
    for (const id of dto.customer_ids) {
      await this.loggerService.logByType(
        LogType.CUSTOMER,
        "массово удален",
        `Клиент был удален в ходе массового удаления (${id})`,
        {
          customer_id: id,
          user_id: user.user_id
        }
      );
    }
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.DELETE, Subject.CUSTOMERS))
  @Delete(CUSTOMERS_ROUTES.delete(":customerId"))
  @ApiOperation({ summary: "Delete a customer" })
  @ApiResponse({ status: 200, description: "Customer deleted successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async delete(@Param("customerId") customerId: string, @CurrentUser() user: User): Promise<void> {
    await this.customersService.delete(customerId);
    await this.loggerService.logByType(LogType.CUSTOMER, "удален", `Клиент был удален (${customerId})`, {
      customer_id: customerId,
      user_id: user.user_id
    });
  }

  @UseGuards(AuthGuard, CaslGuard)
  @CheckPolicies(ability => ability.can(Action.UPDATE, Subject.CUSTOMERS))
  @Patch(CUSTOMERS_ROUTES.restore(":customerId"))
  @ApiOperation({ summary: "Restore a deleted customer" })
  @ApiResponse({ status: 200, description: "Customer restored successfully" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async restore(@Param("customerId") customerId: string, @CurrentUser() user: User): Promise<void> {
    await this.customersService.restore(customerId);
    await this.loggerService.logByType(LogType.CUSTOMER, "восстановлен", `Клиент был восстановлен (${customerId})`, {
      customer_id: customerId,
      user_id: user.user_id
    });
  }
}
