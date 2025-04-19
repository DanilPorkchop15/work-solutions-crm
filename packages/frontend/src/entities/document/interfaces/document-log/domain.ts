import { UniqueEntity } from "../../../../shared/model/interfaces/entity";
import { UserPreview } from "../../../@common/user";
import { DocumentPreview } from "../document/domain";

export interface DocumentLog extends UniqueEntity {
  action: string;
  comment: string | null;
  user: UserPreview;
  document: DocumentPreview;
  createdAt: string;
  deletedAt: string | null;
} 