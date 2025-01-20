import { UserDTO } from "../user/user.dto";

export enum Subject {
  USERS = "users",
  CUSTOMERS = "customers",
  DOCUMENTS = "documents",
  TASKS = "tasks",
  PROJECTS = "projects"
}

export enum Action {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}

export interface PermissionDTO {
  subject: Subject | Subject[];
  action: Action | Action[];
  conditions?: unknown;
  inverted?: boolean;
}

export interface UserWithPermissionsDTO extends UserDTO {
  permissions: PermissionDTO[];
}

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDTO extends TokenDTO {
  user: UserWithPermissionsDTO;
}
