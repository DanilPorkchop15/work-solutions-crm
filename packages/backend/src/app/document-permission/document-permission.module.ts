import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentPermission } from "../../models/entities/document-permission.entity";

import { DocumentPermissionService } from "./document-permission.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentPermission])],
  providers: [DocumentPermissionService],
  exports: [DocumentPermissionService]
})
export class DocumentPermissionModule {}
