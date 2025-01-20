import { APIRoutes } from "../api-routes";

import { UserLogDTO } from "./user-log.dto";

export interface UserLogApi {
  findAll: (userId: string) => Promise<UserLogDTO[]>;
}

export const USER_LOGS_ROUTES: APIRoutes<UserLogApi> = {
  findAll: (userId: string) => `/users/${userId}/logs`
};
