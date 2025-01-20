import { AppAbility } from "./casl-ability.factory";

export interface PolicyHandler {
  handle(ability: AppAbility, resource?: any): boolean;
}

export type PolicyHandlerCallback = (ability: AppAbility, resource?: any) => boolean;
