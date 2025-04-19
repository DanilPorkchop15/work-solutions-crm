import { TableDto } from "../../../../shared/model/interfaces/table";
import { Endpoint, Request } from "../../../../shared/model/interfaces/transport";

import type { ProjectLog } from "./domain";

export type FindAllProjectLogsRequest = Request<{ urlParams: { projectId: string } }>;

export interface ProjectLogsTransport {
  getProjectLogs: Endpoint<FindAllProjectLogsRequest, TableDto<ProjectLog>>;
} 