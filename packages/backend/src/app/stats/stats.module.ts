import { Customer } from "@backend/models/entities/customer.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Document } from "../../models/entities/document.entity";
import { Project } from "../../models/entities/project.entity";

import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Project, Document])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsModule {}
