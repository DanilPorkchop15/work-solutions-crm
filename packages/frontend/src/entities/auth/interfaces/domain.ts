import { UserWithPermissions } from "../../@common/user/interfaces/domain";

export interface LoginData {
  user: UserWithPermissions;
  accessToken: string;
}
