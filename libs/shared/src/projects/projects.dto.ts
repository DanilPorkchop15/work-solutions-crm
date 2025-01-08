import { CustomerPreviewDTO } from "../customers/customers.dto";
import { UserPreviewDTO } from "../users/users.dto";

export enum ProjectStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  COMPLETED = "completed",
  CANCELED = "canceled",
  PAUSED = "paused"
}

export interface ProjectDTO {
  id: string;
  name: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  budget?: number;
  status: ProjectStatus;
  user_created: UserPreviewDTO;
  customer: CustomerPreviewDTO;
  users_accountable: UserPreviewDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectPreviewDTO = Omit<ProjectDTO, "description" | "createdAt" | "updatedAt">;
