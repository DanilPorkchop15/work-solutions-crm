import { tableDecoder } from "@frontend/shared/api";
import { PROJECT_COMMENTS_ROUTES } from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../../shared/model/interfaces/table";
import type {
  CreateProjectCommentRequest,
  DeleteProjectCommentRequest,
  FindAllProjectCommentsRequest,
  DocumentComment,
  ProjectCommentsTransport,
  RestoreProjectCommentRequest,
  UpdateProjectCommentRequest
} from "../../interfaces";

import { projectCommentDecoder } from "./decoders";

@singleton()
export class ProjectCommentsApi extends RequestManager implements ProjectCommentsTransport {
  public async getProjectComments(request: FindAllProjectCommentsRequest): Promise<TableDto<DocumentComment>> {
    return this.createRequest({
      url: PROJECT_COMMENTS_ROUTES.findAll(request.urlParams.projectId),
      serverDataDecoder: tableDecoder(projectCommentDecoder)
    })(request);
  }

  public async createProjectComment(request: CreateProjectCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.POST,
      url: PROJECT_COMMENTS_ROUTES.create(request.urlParams.id)
    })(request);
  }

  public async updateProjectComment(request: UpdateProjectCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: PROJECT_COMMENTS_ROUTES.update(request.urlParams.id)
    })(request);
  }

  public async deleteProjectComment(request: DeleteProjectCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: PROJECT_COMMENTS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreProjectComment(request: RestoreProjectCommentRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: PROJECT_COMMENTS_ROUTES.restore(request.urlParams.id)
    })(request);
  }
}
