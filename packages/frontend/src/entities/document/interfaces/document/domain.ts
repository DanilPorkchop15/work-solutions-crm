import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

import { UniqueEntity } from "../../../../shared/model/interfaces";
import { UserPreview } from "../../../@common/user";

export interface Document extends DocumentPreview {
  description: string | null;
  roles: Role[];
}

export interface DocumentPreview extends UniqueEntity {
  name: string;
  userCreated: UserPreview;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
