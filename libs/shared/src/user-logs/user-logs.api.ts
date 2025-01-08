import { APIRoutes } from "../api-routes";

import { UserLogDTO } from "./user-logs.dto";

export interface UserLogsApi {
  findAll: (userId: string) => Promise<UserLogDTO[]>;
}

export const USER_LOGS_ROUTES: APIRoutes<UserLogsApi> = {
  findAll: (userId: string) => `/users/${userId}/logs`
};
