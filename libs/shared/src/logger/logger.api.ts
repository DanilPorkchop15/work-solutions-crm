import { APIRoutes } from "../api-routes";

import { LogDTO } from "./logger.dto";

export interface LoggerApi {
  latest: () => Promise<LogDTO[]>;
}

export const LOGGER_ROUTES: APIRoutes<LoggerApi> = {
  latest: () => "/logs/latest"
};
