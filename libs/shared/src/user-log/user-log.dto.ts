import { UserPreviewDTO } from "../user/user.dto";

export interface UserLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  created_at: Date;
}
