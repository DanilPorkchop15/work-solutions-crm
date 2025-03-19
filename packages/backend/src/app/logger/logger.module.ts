import { CustomerLog } from "@backend/models/entities/customer-log.entity";
import { DocumentLog } from "@backend/models/entities/document-log.entity";
import { ProjectLog } from "@backend/models/entities/project-log.entity";
import { TaskLog } from "@backend/models/entities/task-log.entity";
import { UserLog } from "@backend/models/entities/user-log.entity";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerService } from "./logger.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TaskLog, UserLog, ProjectLog, DocumentLog, CustomerLog])],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}
