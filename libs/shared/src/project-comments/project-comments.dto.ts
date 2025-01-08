import { UserPreviewDTO } from "../users/users.dto";

export interface ProjectCommentDTO {
  id: string;
  user: UserPreviewDTO;
  text: string;
  created_at: Date;
  updated_at: Date;
}
