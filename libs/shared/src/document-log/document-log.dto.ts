import { DocumentPreviewDTO } from "../document/document.dto";
import { UserPreviewDTO } from "../user/user.dto";

export interface DocumentLogDTO {
  id: string;
  action: string;
  comment: string;
  user: UserPreviewDTO;
  document: DocumentPreviewDTO;
  created_at: string;
  deleted_at?: string;
}
