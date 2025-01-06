import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { CorsOptionsCallback } from "@nestjs/common/interfaces/external/cors-options.interface";
import { addAlias } from "module-alias";

import "reflect-metadata";
addAlias("@backend", __dirname);
import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { useContainer, ValidationError } from "class-validator";
import cookieParser from "cookie-parser";
import { Request } from "express";

import { ConfigService } from "./app/config/config.service";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {});
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): HttpException => {
        return new BadRequestException(errors);
      }
    })
  );
  app.use(cookieParser());
  const configService: ConfigService = app.get(ConfigService);
  if (configService.corsEnabled) {
    const error: any = undefined;
    app.enableCors((req: Request, cb: CorsOptionsCallback): void =>
      cb(error as Error, {
        origin: req.get("origin"),
        credentials: true,
        exposedHeaders: ["Location"]
      })
    );
  }
  await app.listen(3000);
  console.info("Server up and running...");
}

bootstrap().catch((e: Error) => console.error(e));
