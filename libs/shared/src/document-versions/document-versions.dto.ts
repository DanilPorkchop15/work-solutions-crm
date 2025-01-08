import { UserPreviewDTO } from "../users/users.dto";

export interface DocumentVersionDTO {
  id: string;
  document_url: string;
  version: string;
  user_created: UserPreviewDTO;
  createdAt: Date;
  updatedAt: Date;
}
