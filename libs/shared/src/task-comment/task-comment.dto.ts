import { UserPreviewDTO } from "../user/user.dto";

export interface TaskCommentDTO {
  id: string;
  user: UserPreviewDTO;
  text: string;
  created_at: Date;
  updated_at: Date;
}
