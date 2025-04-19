import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomerLog } from "../../models/entities/customer-log.entity";
import { DocumentLog } from "../../models/entities/document-log.entity";
import { ProjectLog } from "../../models/entities/project-log.entity";
import { TaskLog } from "../../models/entities/task-log.entity";
import { UserLog } from "../../models/entities/user-log.entity";

import { LoggerController } from "./logger.controller";
import { LoggerService } from "./logger.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TaskLog, UserLog, ProjectLog, DocumentLog, CustomerLog])],
  providers: [LoggerService],
  exports: [LoggerService],
  controllers: [LoggerController]
})
export class LoggerModule {}
