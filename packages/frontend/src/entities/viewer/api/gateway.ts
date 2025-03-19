import { RequestManager } from "@frontend/shared/lib/requestManager";
import { AUTH_ROUTES } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { Service } from "typedi";

import type { Viewer, ViewerTransport } from "../interfaces";

import { profileDecoder } from "./decoder";

@Service()
export class ViewerApi extends RequestManager implements ViewerTransport {
  public async getProfile(): Promise<Viewer> {
    return this.createRequest({
      url: AUTH_ROUTES.me(),
      serverDataDecoder: profileDecoder
    })();
  }
}
