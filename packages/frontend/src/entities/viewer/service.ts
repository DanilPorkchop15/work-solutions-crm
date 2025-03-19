import { Container, Inject, Service } from "typedi";

import { ViewerApi } from "./api";
import type { ViewerTransport } from "./interfaces";
import { ViewerModel } from "./model";

@Service()
export class ViewerService {
  private _viewerModel: ViewerModel | null = null;

  constructor(
    @Inject()
    private readonly _api: ViewerApi
  ) {}

  public get viewer(): ViewerModel | null {
    return this._viewerModel;
  }

  public async loadViewer(): Promise<void> {
    const profile = await this._api.getProfile();
    this._viewerModel = new ViewerModel(profile);
  }

  public logout(): void {
    this._viewerModel = null;
  }
}

export const viewerService: ViewerService = Container.get(ViewerService);
