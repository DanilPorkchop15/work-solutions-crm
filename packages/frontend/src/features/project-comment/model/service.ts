import { inject, singleton } from "tsyringe";

import { ProjectCommentsApi } from "../../../entities/project/api";

@singleton()
export class ProjectCommentService {
  constructor(
    @inject(ProjectCommentsApi) private readonly _api: ProjectCommentsApi
  ) {}

  public async createComment(projectId: string, text: string): Promise<void> {
    await this._api.createProjectComment({
      urlParams: { id: projectId },
      body: { text }
    });
  }

  public async updateComment(commentId: string, text: string): Promise<void> {
    await this._api.updateProjectComment({
      urlParams: { id: commentId },
      body: { text }
    });
  }

  public async deleteComment(commentId: string): Promise<void> {
    await this._api.deleteProjectComment({
      urlParams: { id: commentId }
    });
  }

  public async restoreComment(commentId: string): Promise<void> {
    await this._api.restoreProjectComment({
      urlParams: { id: commentId }
    });
  }
} 