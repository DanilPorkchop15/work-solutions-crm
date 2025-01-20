import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomerLog } from "../../models/entities/customer-log.entity";

import { CustomerLogController } from "./customer-log.controller";
import { CustomerLogService } from "./customer-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerLog])],
  providers: [CustomerLogService],
  controllers: [CustomerLogController],
  exports: [CustomerLogService]
})
export class CustomerLogModule {}
