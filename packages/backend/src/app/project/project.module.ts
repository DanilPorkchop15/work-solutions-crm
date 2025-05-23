import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "../../models/entities/project.entity";

import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
