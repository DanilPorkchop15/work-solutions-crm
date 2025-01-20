import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { UsersModule } from "../users/users.module";

import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: "configService.authentication.secret",
        signOptions: {
          expiresIn: "60m"
        },
        ignoreExpiration: false
      })
    })
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController, AuthGuard],
  exports: [AuthService]
})
export class AuthModule {}
