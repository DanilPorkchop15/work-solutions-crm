import { CustomDecorator, SetMetadata } from "@nestjs/common";

import { PolicyHandler, PolicyHandlerCallback } from "../app/permission/permission.types";

export const CHECK_POLICIES_KEY = "check_policies";

type CheckPolicies = (...handlers: PolicyHandlerCallback[]) => CustomDecorator<string>;
export const CheckPolicies: CheckPolicies = (...handlers: PolicyHandlerCallback[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
