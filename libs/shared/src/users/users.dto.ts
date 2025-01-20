export enum Role {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
  MODERATOR = "moderator"
}

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

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  position?: string;
  avatarUrl?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPreviewDTO = Omit<UserDTO, "role" | "createdAt" | "updatedAt">;
