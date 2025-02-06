import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CustomerBulkDeleteRequestDTO,
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";
import { Repository } from "typeorm";

import { Customer } from "../../models/entities/customer.entity";

import { mapCustomerToDTO, mapCustomerToPreviewDTO } from "./customer.mappers";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async findAll(): Promise<CustomerPreviewDTO[]> {
    const customers: Customer[] = await this.customerRepository.find({
      relations: ["user_created"]
    });
    return customers.map(mapCustomerToPreviewDTO);
  }

  async findOne(customerId: string): Promise<CustomerDTO> {
    const customer: Customer | null = await this.customerRepository.findOne({
      where: { customer_id: customerId },
      relations: ["user_created"]
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    return mapCustomerToDTO(customer);
  }

  async create(dto: CustomerCreateRequestDTO): Promise<Customer> {
    const customer: Customer = this.customerRepository.create(dto);
    return this.customerRepository.save(customer);
  }

  async update(customerId: string, dto: CustomerUpdateRequestDTO): Promise<void> {
    const customer: Customer | null = await this.customerRepository.findOne({
      where: { customer_id: customerId }
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    Object.assign(customer, dto);
    await this.customerRepository.save(customer);
  }

  async delete(customerId: string): Promise<void> {
    await this.customerRepository.softDelete(customerId);
  }

  async restore(customerId: string): Promise<void> {
    await this.customerRepository.restore(customerId);
  }

  async bulkDelete(dto: CustomerBulkDeleteRequestDTO): Promise<void> {
    await this.customerRepository.softDelete(dto.customer_ids);
  }

  async bulkRestore(dto: CustomerBulkDeleteRequestDTO): Promise<void> {
    await this.customerRepository.restore(dto.customer_ids);
  }
}
