import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentComment } from "../../models/entities/document-comment.entity";

import { DocumentCommentController } from "./document-comment.controller";
import { DocumentCommentService } from "./document-comment.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentComment])],
  providers: [DocumentCommentService],
  controllers: [DocumentCommentController],
  exports: [DocumentCommentService]
})
export class DocumentCommentModule {}
