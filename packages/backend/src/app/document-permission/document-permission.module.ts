import { DocumentPermissionGuard } from "@backend/app/document-permission/document-permission.guard";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentPermission } from "../../models/entities/document-permission.entity";

import { DocumentPermissionService } from "./document-permission.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentPermission])],
  providers: [DocumentPermissionService, DocumentPermissionGuard],
  exports: [DocumentPermissionService, DocumentPermissionGuard]
})
export class DocumentPermissionModule {}
