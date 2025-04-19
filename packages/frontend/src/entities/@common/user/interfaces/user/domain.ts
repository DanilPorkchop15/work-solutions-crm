import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UniqueEntity } from "../../../../../shared/model/interfaces/entity";

export interface User extends UserPreview {
  role: Role;
  updatedAt: string;
  createdAt: string;
}

export interface UserPreview extends UniqueEntity {
  avatarUrl: string | null;
  fullName: string;
  email: string;
  position: string | null;
  deletedAt: string | null;
}

export interface Permission {
  subject: Subject;
  action: Action;
  inverted: boolean;
}

export interface UserWithPermissions extends User {
  permissions: Permission[];
}
