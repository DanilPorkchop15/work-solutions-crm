import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskComment } from "../../models/entities/task-comment.entity";

import { TaskCommentController } from "./task-comment.controller";
import { TaskCommentService } from "./task-comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([TaskComment])],
  providers: [TaskCommentService],
  controllers: [TaskCommentController],
  exports: [TaskCommentService]
})
export class TaskCommentModule {}
