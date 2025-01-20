import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectLog } from "../../models/entities/project-log.entity";

import { ProjectLogController } from "./project-log.controller";
import { ProjectLogService } from "./project-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectLog])],
  providers: [ProjectLogService],
  controllers: [ProjectLogController],
  exports: [ProjectLogService]
})
export class ProjectLogModule {}
