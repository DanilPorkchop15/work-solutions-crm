import { RequestManager } from "@frontend/shared/lib/requestManager";
import { TableDto } from "@frontend/shared/model/interfaces";
import { PROJECT_LOGS_ROUTES } from "@work-solutions-crm/libs/shared/project-log/project-log.api";
import { singleton } from "tsyringe";

import { tableDecoder } from "../../../../shared/api";
import { ProjectLog, ProjectLogsTransport, FindAllProjectLogsRequest } from "../../interfaces";

import { projectLogDecoder } from "./decoder";

@singleton()
export class ProjectLogsApi extends RequestManager implements ProjectLogsTransport {
  public async getProjectLogs(request: FindAllProjectLogsRequest): Promise<TableDto<ProjectLog>> {
    return this.createRequest({
      url: PROJECT_LOGS_ROUTES.findAll(request.urlParams.projectId),
      serverDataDecoder: tableDecoder(projectLogDecoder)
    })(request);
  }
} 