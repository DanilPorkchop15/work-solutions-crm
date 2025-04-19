import { tableDecoder } from "@frontend/shared/api";
import { PROJECTS_ROUTES } from "@work-solutions-crm/libs/shared/project/project.api";
import { singleton } from "tsyringe";

import { METHODS, RequestManager } from "../../../../shared/lib/requestManager/requestManager";
import { TableDto } from "../../../../shared/model/interfaces/table";
import type {
  BulkDeleteProjectRequest,
  BulkRestoreProjectRequest,
  CreateProjectRequest,
  DeleteProjectRequest,
  FindOneProjectRequest,
  Project,
  ProjectPreview,
  ProjectsTransport,
  RestoreProjectRequest,
  UpdateProjectRequest
} from "../../interfaces";

import { projectDecoder, projectPreviewDecoder } from "./decoders";

@singleton()
export class ProjectsApi extends RequestManager implements ProjectsTransport {
  public async getProjects(): Promise<TableDto<ProjectPreview>> {
    return this.createRequest({
      url: PROJECTS_ROUTES.findAll(),
      serverDataDecoder: tableDecoder(projectPreviewDecoder)
    })();
  }

  public async getProject(request: FindOneProjectRequest): Promise<Project> {
    return this.createRequest({
      url: PROJECTS_ROUTES.findOne(request.urlParams.id),
      serverDataDecoder: projectDecoder
    })(request);
  }

  public async createProject(request: CreateProjectRequest): Promise<Project> {
    return this.createRequest({
      method: METHODS.POST,
      url: PROJECTS_ROUTES.create(),
      serverDataDecoder: projectDecoder
    })(request);
  }

  public async updateProject(request: UpdateProjectRequest): Promise<Project> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: PROJECTS_ROUTES.update(request.urlParams.id),
      serverDataDecoder: projectDecoder
    })(request);
  }

  public async deleteProject(request: DeleteProjectRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: PROJECTS_ROUTES.delete(request.urlParams.id)
    })(request);
  }

  public async restoreProject(request: RestoreProjectRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: PROJECTS_ROUTES.restore(request.urlParams.id)
    })(request);
  }

  public async bulkDeleteProject(request: BulkDeleteProjectRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.DELETE,
      url: PROJECTS_ROUTES.bulkDelete()
    })(request);
  }

  public async bulkRestoreProject(request: BulkRestoreProjectRequest): Promise<void> {
    return this.createRequest({
      method: METHODS.PATCH,
      url: PROJECTS_ROUTES.bulkRestore()
    })(request);
  }
}
