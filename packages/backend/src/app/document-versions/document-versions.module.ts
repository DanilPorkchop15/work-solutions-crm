import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";

import { DocumentVersion } from "../../models/entities/document-version.entity";

import { DocumentVersionsController } from "./document-versions.controller";
import { DocumentVersionsService } from "./document-versions.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentVersion]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads/documents",
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      })
    })
  ],
  providers: [DocumentVersionsService],
  controllers: [DocumentVersionsController],
  exports: [DocumentVersionsService]
})
export class DocumentVersionsModule {}
