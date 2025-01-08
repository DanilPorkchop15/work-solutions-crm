import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskComment } from "../../models/entities/task-comment.entity";

import { TaskCommentsController } from "./task-comments.controller";
import { TaskCommentsService } from "./task-comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskComment])],
  providers: [TaskCommentsService],
  controllers: [TaskCommentsController],
  exports: [TaskCommentsService]
})
export class TaskCommentsModule {}
