import { UserPreviewDTO } from "../user/user.dto";

export interface UserLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  affected_user: UserPreviewDTO;
  created_at: string;
  deleted_at?: string;
}
