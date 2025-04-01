import { Project, ProjectsApi } from "@frontend/entities/project";
import { ProjectDetailsService } from "@frontend/entities/project/model";
import { ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { inject, singleton } from "tsyringe";

@singleton()
export class ProjectUpdateService {
  constructor(
    @inject(ProjectsApi) private readonly _api: ProjectsApi,
    @inject(ProjectDetailsService) private readonly _projectDetailsService: ProjectDetailsService
  ) {}

  public get projectDetails(): Project {
    const projectDetails: Project | null = this._projectDetailsService.projectDetails;
    if (!projectDetails) {
      throw new Error("ProjectDetailsService not found");
    }
    return projectDetails;
  }

  public async update(dto: ProjectUpdateRequestDTO): Promise<void> {
    const id = this.projectDetails.id;
    await this._api.updateProject({ urlParams: { id }, body: dto });
    await this._projectDetailsService.loadProjectDetails({ urlParams: { id } });
  }
}
