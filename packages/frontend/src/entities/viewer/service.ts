import { inject, singleton } from "tsyringe";

import { ViewerApi } from "./api/gateway";
import { Viewer } from "./interfaces";
import { ViewerModel } from "./model";

@singleton()
export class ViewerService {
  private _viewerModel: ViewerModel | null = null;

  constructor(@inject(ViewerApi) private readonly _api: ViewerApi) {}

  public get viewer(): ViewerModel | null {
    return this._viewerModel;
  }

  public async loadViewer(): Promise<void> {
    const profile: Viewer = await this._api.getProfile();
    this._viewerModel = new ViewerModel(profile);
  }

  public logout(): void {
    this._viewerModel = null;
  }
}
