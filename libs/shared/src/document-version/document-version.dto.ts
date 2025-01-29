import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentVersionDTO {
  id: string;
  document_url: string;
  version: string;
  user_created: UserPreviewDTO;
  created_at: string;
  updated_at: string;
}
