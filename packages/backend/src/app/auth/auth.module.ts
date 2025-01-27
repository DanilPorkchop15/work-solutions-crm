import { PermissionModule } from "@backend/app/permission/permission.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { UserModule } from "../user/user.module";

import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.database.database,
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
