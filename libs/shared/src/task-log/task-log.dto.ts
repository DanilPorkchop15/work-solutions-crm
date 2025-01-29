import { TaskPreviewDTO } from "../task/task.dto";
import { UserPreviewDTO } from "../user/user.dto";

export interface TaskLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  task: TaskPreviewDTO;
  created_at: string;
}
