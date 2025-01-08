import { DocumentPreviewDTO } from "../documents/documents.dto";
import { UserPreviewDTO } from "../users/users.dto";

export interface DocumentLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  document: DocumentPreviewDTO;
  created_at: Date;
}
