import { PermissionModule } from "@backend/app/permission/permission.module";
import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { UserModule } from "../user/user.module";

import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Global()
@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.authentication.secret,
        algorithm: configService.authentication.algorithm,
        signOptions: {
          expiresIn: "15m"
        },
        ignoreExpiration: false
      })
    }),
    PermissionModule
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}
