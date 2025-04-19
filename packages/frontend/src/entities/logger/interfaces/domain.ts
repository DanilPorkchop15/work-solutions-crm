import { UserPreview } from "@frontend/entities/@common/user";

export interface Log {
  id: string;
  type: string;
  action: string;
  comment: string;
  user: UserPreview;
  createdAt: string;
  deletedAt: string | null;
}
