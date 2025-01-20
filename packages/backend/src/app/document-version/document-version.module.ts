import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";

import { DocumentVersion } from "../../models/entities/document-version.entity";

import { DocumentVersionController } from "./document-version.controller";
import { DocumentVersionService } from "./document-version.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentVersion]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads/document",
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      })
    })
  ],
  providers: [DocumentVersionService],
  controllers: [DocumentVersionController],
  exports: [DocumentVersionService]
})
export class DocumentVersionModule {}
