import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RolePermission } from "../../models/entities/role-permission.entity";

import { PermissionsGuard } from "./permissions.guard";
import { PermissionsService } from "./permissions.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  providers: [RolePermission, PermissionsGuard],
  exports: [PermissionsService]
})
export class PermissionsModule {}
