import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserLog } from "../../models/entities/user-log.entity";

import { UserLogController } from "./user-log.controller";
import { UserLogService } from "./user-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  providers: [UserLogService],
  controllers: [UserLogController],
  exports: [UserLogService]
})
export class UserLogModule {}
