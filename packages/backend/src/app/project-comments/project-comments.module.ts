import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectComment } from "../../models/entities/project-comment.entity";

import { ProjectCommentsController } from "./project-comments.controller";
import { ProjectCommentsService } from "./project-comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectComment])],
  providers: [ProjectCommentsService],
  controllers: [ProjectCommentsController],
  exports: [ProjectCommentsService]
})
export class ProjectCommentsModule {}
