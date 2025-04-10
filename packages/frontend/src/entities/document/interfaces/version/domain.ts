import { UniqueEntity } from "../../../../shared/model/interfaces";
import { UserPreview } from "../../../@common/user";

export interface DocumentVersion extends UniqueEntity {
  documentUrl: string;
  version: number;
  userCreated: UserPreview;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
