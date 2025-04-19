import { ProjectCreateRequestDTO, ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { inject, singleton } from "tsyringe";

import { ProjectsApi } from "../../../entities/project";

@singleton()
export class ProjectService {
  constructor(@inject(ProjectsApi) private readonly _api: ProjectsApi) {}

  public async getOne(id: string) {
    return this._api.getProject({ urlParams: { id } });
  }

  public async getAll() {
    return this._api.getProjects();
  }

  public async create(dto: ProjectCreateRequestDTO) {
    return this._api.createProject({ body: dto });
  }

  public async update(id: string, dto: ProjectUpdateRequestDTO) {
    return this._api.updateProject({ urlParams: { id }, body: dto });
  }

  public async delete(id: string) {
    return this._api.deleteProject({ urlParams: { id } });
  }

  public async restore(id: string) {
    return this._api.restoreProject({ urlParams: { id } });
  }

  public async bulkDelete(ids: string[]) {
    return this._api.bulkDeleteProject({ body: { project_ids: ids } });
  }

  public async bulkRestore(ids: string[]) {
    return this._api.bulkRestoreProject({ body: { project_ids: ids } });
  }
}
