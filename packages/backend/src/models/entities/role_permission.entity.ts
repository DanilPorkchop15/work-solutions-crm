import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

import { SQL_CONSTRAINTS } from "../../common/sql-conststrints.enum";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator"
}

export enum PermissionObject {
  USERS = "users",
  CUSTOMERS = "customers",
  DOCUMENTS = "documents",
  TASKS = "tasks",
  PROJECTS = "projects"
}

export enum PermissionAction {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}

@Entity("role_permissions")
@Unique(SQL_CONSTRAINTS.UNIQUE_ROLE_OBJECT_AND_ACTION, (rolePermission: RolePermission) => [
  rolePermission.role,
  rolePermission.object,
  rolePermission.action
])
export class RolePermission {
  @PrimaryGeneratedColumn("uuid")
  role_permission_id: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column({ type: "enum", enum: PermissionObject })
  object: PermissionObject;

  @Column({ type: "enum", enum: PermissionAction })
  action: PermissionAction;
}
