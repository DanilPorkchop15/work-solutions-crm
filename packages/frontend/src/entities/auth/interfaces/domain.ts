import { UserWithPermissions } from "../../@common/user";

export interface LoginData {
  user: UserWithPermissions;
  accessToken: string;
}
