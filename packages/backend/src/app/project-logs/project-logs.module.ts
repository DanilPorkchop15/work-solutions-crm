import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectLog } from "../../models/entities/project-log.entity";

import { ProjectLogsController } from "./project-logs.controller";
import { ProjectLogsService } from "./project-logs.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectLog])],
  providers: [ProjectLogsService],
  controllers: [ProjectLogsController],
  exports: [ProjectLogsService]
})
export class ProjectLogsModule {}
