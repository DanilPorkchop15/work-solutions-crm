import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomerLog } from "../../models/entities/customer-log.entity";
import { CustomerLogsController } from "../customer-logs/customer-logs.controller";

import { CustomerLogsService } from "./customer-logs.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomerLog])],
  providers: [CustomerLogsService],
  controllers: [CustomerLogsController],
  exports: [CustomerLogsService]
})
export class CustomerLogsModule {}
