import { UniqueEntity } from "../../../shared/model/interfaces/entity";
import { UserPreview } from "../../@common/user/interfaces/domain";

export interface Customer extends CustomerPreview {
  phone: string | null;
  inn: string | null;
  website: string | null;
  userCreated: UserPreview;
}

export interface CustomerPreview extends UniqueEntity {
  name: string;
  email: string | null;
  userCreated: UserPreview;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
