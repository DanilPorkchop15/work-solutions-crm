import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthRequest } from "../app/auth/auth.types";
import { User } from "../models/entities/user.entity";

export const CurrentUser: () => ParameterDecorator = createParamDecorator(
  (data, ctx: ExecutionContext): User | undefined => {
    const { user }: AuthRequest = ctx.switchToHttp().getRequest();

    return user;
  }
);
