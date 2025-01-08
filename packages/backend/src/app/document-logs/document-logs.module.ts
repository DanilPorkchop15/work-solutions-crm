import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentLog } from "../../models/entities/document-log.entity";

import { DocumentLogsController } from "./document-logs.controller";
import { DocumentLogsService } from "./document-logs.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentLog])],
  providers: [DocumentLogsService],
  controllers: [DocumentLogsController],
  exports: [DocumentLogsService]
})
export class DocumentLogsModule {}
