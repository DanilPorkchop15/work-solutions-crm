import { AUTH_ROUTES } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { singleton } from "tsyringe";

import { RequestManager } from "../../../shared/lib/requestManager/requestManager";
import type { Viewer, ViewerTransport } from "../interfaces";

import { profileDecoder } from "./decoder";

@singleton()
export class ViewerApi extends RequestManager implements ViewerTransport {
  public async getProfile(): Promise<Viewer> {
    return this.createRequest({
      url: AUTH_ROUTES.me(),
      serverDataDecoder: profileDecoder
    })();
  }
}
