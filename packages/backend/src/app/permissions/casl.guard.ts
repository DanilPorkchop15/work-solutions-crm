import { PolicyHandler, PolicyHandlerCallback } from "@backend/app/permissions/permissions.types";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CHECK_POLICIES_KEY } from "@backend/decorators/check-policies.decorator";
import { AppAbility, CaslAbilityFactory } from "@backend/app/permissions/casl-ability.factory";
import { AuthRequest } from "@backend/app/auth/auth.types";

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];

    const request: AuthRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const resource = request.body || request.params;

    if (!user) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    const isAllowed = policyHandlers.every(handler => this.execPolicyHandler(handler, ability, resource));

    if (!isAllowed) {
      throw new ForbiddenException("У вас нет доступа к этому ресурсу");
    }

    return true;
  }

  private execPolicyHandler(
    handler: PolicyHandler | PolicyHandlerCallback,
    ability: AppAbility,
    resource: any
  ): boolean {
    if (typeof handler === "function") {
      return handler(ability, resource);
    }
    return handler.handle(ability, resource);
  }
}
