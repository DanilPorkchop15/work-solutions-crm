import { UniqueEntity } from "../../../../shared/model/interfaces/entity";
import { UserPreview } from "../../../@common/user";
import { ProjectPreview } from "../project/domain";

export interface ProjectLog extends UniqueEntity {
  action: string;
  comment: string | null;
  user: UserPreview;
  project: ProjectPreview;
  createdAt: string;
  deletedAt: string | null;
}
