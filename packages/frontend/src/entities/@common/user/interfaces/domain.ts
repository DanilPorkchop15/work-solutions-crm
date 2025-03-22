import type { UniqueEntity } from "@frontend/shared/model/interfaces";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

export interface User extends UserPreview {
  role: Role;
  updatedAt: ISO;
  createdAt: ISO;
}

export interface UserPreview extends UniqueEntity {
  avatarUrl: string | null;
  fullName: string;
  email: string;
  position: string | null;
  deletedAt: ISO | null;
}

export interface Permission {
  subject: Subject;
  action: Action;
  inverted: boolean;
}

export interface UserWithPermissions extends User {
  permissions: Permission[];
}
