import { UserPreviewDTO } from "../user/user.dto";

export interface LogDTO {
  id: string;
  type: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  created_at: string;
  deleted_at?: string;
}
