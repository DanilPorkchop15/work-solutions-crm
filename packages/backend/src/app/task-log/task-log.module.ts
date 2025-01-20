import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskLog } from "../../models/entities/task-log.entity";

import { TaskLogService } from "./task-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskLog])],
  providers: [TaskLogService],
  controllers: [TaskLogService],
  exports: [TaskLogService]
})
export class TaskLogModule {}
