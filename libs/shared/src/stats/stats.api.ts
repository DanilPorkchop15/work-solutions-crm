import { APIRoutes } from "@work-solutions-crm/libs/shared/api-routes";
import { StatsDTO } from "@work-solutions-crm/libs/shared/stats/stats.dto";

export interface StatsApi {
  get(...omitted: never): Promise<StatsDTO>;
}

export const STATS_ROUTES: APIRoutes<StatsApi> = {
  get: () => `/stats`
};
