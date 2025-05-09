import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentVersionDTO {
  id: string;
  document_url: string;
  version: number;
  user_created: UserPreviewDTO;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
