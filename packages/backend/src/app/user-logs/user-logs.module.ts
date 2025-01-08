import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserLog } from "../../models/entities/user-log.entity";

import { UserLogsController } from "./user-logs.controller";
import { UserLogsService } from "./user-logs.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  providers: [UserLogsService],
  controllers: [UserLogsController],
  exports: [UserLogsService]
})
export class UserLogsModule {}
