import { CustomDecorator, SetMetadata } from "@nestjs/common";

import { PolicyHandler } from "../app/permission/permission.types";

export const CHECK_POLICIES_KEY = "check_policies";

type CheckPolicies = (...handlers: PolicyHandler[]) => CustomDecorator<string>;
export const CheckPolicies: CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
