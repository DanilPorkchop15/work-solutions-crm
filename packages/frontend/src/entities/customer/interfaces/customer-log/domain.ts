import { UniqueEntity } from "../../../../shared/model/interfaces/entity";
import { UserPreview } from "../../../@common/user";
import { CustomerPreview } from "../customer/domain";

export interface CustomerLog extends UniqueEntity {
  action: string;
  comment: string | null;
  user: UserPreview;
  customer: CustomerPreview;
  createdAt: string;
  deletedAt: string | null;
} 