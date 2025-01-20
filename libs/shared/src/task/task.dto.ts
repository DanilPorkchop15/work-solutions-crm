import { ProjectPreviewDTO } from "../project/project.dto";
import { UserPreviewDTO } from "../user/user.dto";

export enum TaskStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELED = "canceled"
}

export interface TaskDTO {
  id: string;
  name: string;
  description?: string;
  status: TaskStatus;
  start_date?: Date;
  end_date?: Date;
  time_spent?: number;
  estimated_time?: number;
  user_created: UserPreviewDTO;
  project: ProjectPreviewDTO;
  users_accountable: UserPreviewDTO[];
  created_at: Date;
  updated_at: Date;
}

export type TaskPreviewDTO = Omit<TaskDTO, "description" | "created_at" | "updated_at">;
