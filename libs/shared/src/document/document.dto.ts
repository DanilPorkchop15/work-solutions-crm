import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentDTO {
  id: string;
  name: string;
  description?: string;
  user_created: UserPreviewDTO;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type DocumentPreviewDTO = Omit<DocumentDTO, "description">;
