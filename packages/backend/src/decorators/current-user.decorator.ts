import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDTO } from "@work-solutions-crm/libs/shared/users/users.dto";

import { AuthRequest } from "../app/auth/auth.types";

export const CurrentUser: () => ParameterDecorator = createParamDecorator(
  (ctx: ExecutionContext): UserDTO | undefined => {
    const { user }: AuthRequest = ctx.switchToHttp().getRequest();

    return user;
  }
);
