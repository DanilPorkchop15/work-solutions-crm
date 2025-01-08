import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentComment } from "../../models/entities/document-comment.entity";

import { DocumentCommentsController } from "./document-comments.controller";
import { DocumentCommentsService } from "./document-comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentComment])],
  providers: [DocumentCommentsService],
  controllers: [DocumentCommentsController],
  exports: [DocumentCommentsService]
})
export class DocumentCommentsModule {}
