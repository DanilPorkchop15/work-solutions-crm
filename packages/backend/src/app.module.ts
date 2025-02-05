import { LoggerModule } from "@backend/app/logger/logger.module";
import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AuthModule } from "./app/auth/auth.module";
import { ConfigModule } from "./app/config/config.module";
import { ConfigService } from "./app/config/config.service";
import { UserModule } from "./app/user/user.module";
import { entitiesAndMigrations } from "./app.migrations";

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot({ global: true }),
    AuthModule,
    UserModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): TypeOrmModuleOptions {
        return {
          type: "postgres",
          host: config.database.host,
          port: config.database.port,
          database: config.database.database,
          username: config.database.username,
          password: config.database.password,
          migrationsRun: true,
          logging: true,
          ...entitiesAndMigrations
        };
      }
    })
  ]
})
export class AppModule {}
