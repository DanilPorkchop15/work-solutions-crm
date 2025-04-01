import { makeAutoObservable } from "mobx";
import { inject, singleton } from "tsyringe";

import { ProjectsApi } from "../../api/gateway";
import type { FindOneProjectRequest, Project } from "../../interfaces";

@singleton()
export class ProjectDetailsService {
  private _projectDetailsModel: Project | null = null;

  constructor(@inject(ProjectsApi) private readonly _api: ProjectsApi) {
    makeAutoObservable(this);
  }

  public get projectDetails(): Project | null {
    return this._projectDetailsModel;
  }

  public async loadProjectDetails({ urlParams }: FindOneProjectRequest): Promise<void> {
    this._projectDetailsModel = await this._api.getProject({ urlParams });
  }
}
