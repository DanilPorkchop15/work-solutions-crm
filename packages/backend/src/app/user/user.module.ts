import { ConfigModule } from "@backend/app/config/config.module";
import { ConfigService } from "@backend/app/config/config.service";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";

import { User } from "../../models/entities/user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: `${configService.uploadsDir}/user/avatar`,
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
          }
        })
      })
    })
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
