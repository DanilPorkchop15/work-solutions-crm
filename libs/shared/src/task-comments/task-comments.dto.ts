import { UserPreviewDTO } from "../users/users.dto";

export interface TaskCommentDTO {
  id: string;
  user: UserPreviewDTO;
  text: string;
  created_at: Date;
  updated_at: Date;
}
