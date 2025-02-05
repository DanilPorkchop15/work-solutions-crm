import { CustomerPreviewDTO } from "../customer/customer.dto";
import { UserPreviewDTO } from "../user/user.dto";

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
  start_date: string;
  end_date: string;
  budget?: number;
  status: ProjectStatus;
  user_created: UserPreviewDTO;
  customer: CustomerPreviewDTO;
  users_accountable: UserPreviewDTO[];
  created_at: string;
  updated_at: string;
}

export type ProjectPreviewDTO = Omit<ProjectDTO, "description" | "created_at" | "updated_at">;
