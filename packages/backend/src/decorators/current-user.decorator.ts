import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

import { AuthRequest } from "../app/auth/auth.types";

export const CurrentUser: () => ParameterDecorator = createParamDecorator(
  (data, ctx: ExecutionContext): UserDTO | undefined => {
    const { user }: AuthRequest = ctx.switchToHttp().getRequest();

    return user;
  }
);
