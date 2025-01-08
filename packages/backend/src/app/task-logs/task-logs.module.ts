import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskLog } from "../../models/entities/task-log.entity";

import { TaskLogsService } from "./task-logs.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskLog])],
  providers: [TaskLogsService],
  controllers: [TaskLogsService],
  exports: [TaskLogsService]
})
export class TaskLogsModule {}
