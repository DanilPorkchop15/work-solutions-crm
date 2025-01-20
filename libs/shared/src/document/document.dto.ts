import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentDTO {
  id: string;
  name: string;
  description?: string;
  user_created: UserPreviewDTO;
  createdAt: Date;
  updatedAt: Date;
}

export type DocumentPreviewDTO = Omit<DocumentDTO, "description">;
