import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DocumentPermission } from "../../models/entities/document-permission.entity";

import { DocumentPermissionsService } from "./document-permissions.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentPermission])],
  providers: [DocumentPermissionsService],
  exports: [DocumentPermissionsService]
})
export class DocumentPermissionsModule {}
