import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentCommentDTO {
  id: string;
  user: UserPreviewDTO;
  text: string;
  created_at: string;
  updated_at: string;
}
