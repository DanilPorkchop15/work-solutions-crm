import { TaskPreviewDTO } from "../tasks/tasks.dto";
import { UserPreviewDTO } from "../users/users.dto";

export interface TaskLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  task: TaskPreviewDTO;
  created_at: Date;
}
