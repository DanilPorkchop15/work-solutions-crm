import { ProjectPreviewDTO } from "../projects/projects.dto";
import { UserPreviewDTO } from "../users/users.dto";

export interface ProjectLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  project: ProjectPreviewDTO;
  created_at: Date;
}
