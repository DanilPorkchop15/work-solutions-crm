import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentLog } from "../../models/entities/document-log.entity";

import { DocumentLogController } from "./document-log.controller";
import { DocumentLogService } from "./document-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentLog])],
  providers: [DocumentLogService],
  controllers: [DocumentLogController],
  exports: [DocumentLogService]
})
export class DocumentLogModule {}
