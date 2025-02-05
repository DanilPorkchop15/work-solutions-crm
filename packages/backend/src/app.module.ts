import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ServeStaticModule } from "@nestjs/serve-static";
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
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.uploadsDir,
          serveRoot: "/uploads",
          serveStaticOptions: {
            cacheControl: true,
            immutable: true,
            dotfiles: "ignore"
          }
        }
      ]
    })
  ]
})
export class AppModule {}
