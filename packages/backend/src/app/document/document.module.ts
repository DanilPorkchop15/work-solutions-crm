import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Document } from "../../models/entities/document.entity";
import { User } from "../../models/entities/user.entity";

import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";

@Module({
  imports: [TypeOrmModule.forFeature([Document, User])],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService]
})
export class DocumentModule {}
