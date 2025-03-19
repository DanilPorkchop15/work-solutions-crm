import { UserWithPermissions } from "@frontend/entities/@common/user/interfaces";

export interface LoginData {
  user: UserWithPermissions;
  accessToken: string;
}
