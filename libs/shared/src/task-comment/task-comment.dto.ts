import { UserPreviewDTO } from "../user/user.dto";

export interface TaskCommentDTO {
  id: string;
  user: UserPreviewDTO;
  text: string;
  created_at: string;
  updated_at: string;
}
