import { Log, logDecoder, LoggerTransport } from "@frontend/entities/logger";
import { tableDecoder } from "@frontend/shared/api";
import { LOGGER_ROUTES } from "@work-solutions-crm/libs/shared/logger/logger.api";
import { singleton } from "tsyringe";

import { RequestManager } from "../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../shared/model/interfaces/table";

@singleton()
export class LoggerApi extends RequestManager implements LoggerTransport {
  latest(): Promise<TableDto<Log>> {
    return this.createRequest({
      url: LOGGER_ROUTES.latest(),
      serverDataDecoder: tableDecoder(logDecoder)
    })();
  }
}
