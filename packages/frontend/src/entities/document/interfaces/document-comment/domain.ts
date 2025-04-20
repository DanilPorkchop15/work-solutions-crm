import { UserPreview } from "@frontend/entities/@common/user";

import { UniqueEntity } from "../../../../shared/model/interfaces/entity";

export interface DocumentComment extends UniqueEntity {
  user: UserPreview;
  text: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
