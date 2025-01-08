import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-logs/customer-logs.dto";
import { Repository } from "typeorm";

import { CustomerLog } from "../../models/entities/customer-log.entity";

import { mapCustomerLogToDTO } from "./customer-logs.mappers";

@Injectable()
export class CustomerLogsService {
  constructor(
    @InjectRepository(CustomerLog)
    private readonly customerLogRepository: Repository<CustomerLog>
  ) {}

  async findAll(customerId: string): Promise<CustomerLogDTO[]> {
    const logs: CustomerLog[] = await this.customerLogRepository.find({
      where: { customer: { customer_id: customerId } },
      relations: ["user", "customer"]
    });
    return logs.map(mapCustomerLogToDTO);
  }
}
