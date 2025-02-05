import { ProjectPreviewDTO } from "../project/project.dto";
import { UserPreviewDTO } from "../user/user.dto";

export interface ProjectLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  project: ProjectPreviewDTO;
  created_at: string;
}
