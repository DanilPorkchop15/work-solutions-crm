import { Stats, statsDecoder, StatsTransport } from "@frontend/entities/stats";
import { RequestManager } from "@frontend/shared/lib/requestManager";
import { STATS_ROUTES } from "@work-solutions-crm/libs/shared/stats/stats.api";
import { singleton } from "tsyringe";

@singleton()
export class StatsApi extends RequestManager implements StatsTransport {
  getStats(): Promise<Stats> {
    return this.createRequest({
      url: STATS_ROUTES.get(),
      serverDataDecoder: statsDecoder
    })();
  }
}
