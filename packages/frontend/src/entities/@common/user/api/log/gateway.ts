import { userLogDecoder } from "@frontend/entities/@common/user";
import { tableDecoder } from "@frontend/shared/api";
import { RequestManager } from "@frontend/shared/lib/requestManager";
import { TableDto } from "@frontend/shared/model/interfaces";
import { USER_LOGS_ROUTES } from "@work-solutions-crm/libs/shared/user-log/user-log.api";
import { singleton } from "tsyringe";

import { FindAllUserLogsRequest, UserLog, UserLogsTransport } from "../../interfaces";

@singleton()
export class UserLogsApi extends RequestManager implements UserLogsTransport {
  public async getUserLogs(request: FindAllUserLogsRequest): Promise<TableDto<UserLog>> {
    return this.createRequest({
      url: USER_LOGS_ROUTES.findAll(request.urlParams.userId),
      serverDataDecoder: tableDecoder(userLogDecoder)
    })(request);
  }
}
