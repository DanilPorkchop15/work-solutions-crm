import { Global, Module } from "@nestjs/common";

import { CaslGuard } from "./casl.guard";
import { CaslAbilityFactory } from "./casl-ability.factory";

@Global()
@Module({
  providers: [CaslAbilityFactory, CaslGuard],
  exports: [CaslAbilityFactory, CaslGuard]
})
export class PermissionModule {}
