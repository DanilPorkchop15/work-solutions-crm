import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectComment } from "../../models/entities/project-comment.entity";

import { ProjectCommentController } from "./project-comment.controller";
import { ProjectCommentService } from "./project-comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectComment])],
  providers: [ProjectCommentService],
  controllers: [ProjectCommentController],
  exports: [ProjectCommentService]
})
export class ProjectCommentModule {}
