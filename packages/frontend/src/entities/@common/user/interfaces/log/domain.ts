import { UserPreview } from "@frontend/entities/@common/user";

export interface UserLog {
  id: string;
  action: string;
  comment: string;
  user: UserPreview;
  affectedUser: UserPreview;
  createdAt: string;
  deletedAt: string | null;
}
