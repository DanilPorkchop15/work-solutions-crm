import { ProjectCommentModule } from "@backend/app/project-comment/project-comment.module";
import { ProjectLogModule } from "@backend/app/project-log/project-log.module";
import { TaskCommentModule } from "@backend/app/task-comment/task-comment.module";
import { TaskLogModule } from "@backend/app/task-log/task-log.module";
import { UserLogModule } from "@backend/app/user-log/user-log.module";
import { LoggerModule } from "@backend/app/logger/logger.module";
import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AuthModule } from "./app/auth/auth.module";
import { ConfigModule } from "./app/config/config.module";
import { ConfigService } from "./app/config/config.service";
import { CustomerModule } from "./app/customer/customer.module";
import { CustomerLogModule } from "./app/customer-log/customer-log.module";
import { DocumentModule } from "./app/document/document.module";
import { DocumentCommentModule } from "./app/document-comment/document-comment.module";
import { DocumentLogModule } from "./app/document-log/document-log.module";
import { DocumentPermissionModule } from "./app/document-permission/document-permission.module";
import { DocumentVersionModule } from "./app/document-version/document-version.module";
import { LoggerModule } from "./app/logger/logger.module";
import { PermissionModule } from "./app/permission/permission.module";
import { ProjectModule } from "./app/project/project.module";
import { TaskModule } from "./app/task/task.module";
import { UserModule } from "./app/user/user.module";
import { entitiesAndMigrations } from "./app.migrations";

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot({ global: true }),
    AuthModule,
    UserModule,
    LoggerModule,
    UserLogModule,
    DocumentModule,
    DocumentCommentModule,
    DocumentLogModule,
    DocumentVersionModule,
    DocumentPermissionModule,
    CustomerModule,
    CustomerLogModule,
    LoggerModule,
    PermissionModule,
    ProjectModule,
    ProjectCommentModule,
    ProjectLogModule,
    TaskModule,
    TaskCommentModule,
    TaskLogModule,
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
