import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";

import { UniqueEntity } from "../../../../shared/model/interfaces/entity";
import { UserPreview } from "../../../@common/user";
import { CustomerPreview } from "../../../customer";

export interface Project extends ProjectPreview {
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPreview extends UniqueEntity {
  name: string;
  startDate: string;
  endDate: string;
  budget: number | null;
  status: ProjectStatus;
  userCreated: UserPreview;
  customer: CustomerPreview;
  usersAccountable: UserPreview[];
  deletedAt: string | null;
}
