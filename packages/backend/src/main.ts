import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { CorsOptionsCallback } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer, ValidationError } from "class-validator";
import cookieParser from "cookie-parser";
import { Request } from "express";
import { addAlias } from "module-alias";

import "reflect-metadata";

import { ConfigService } from "./app/config/config.service";
import { AppModule } from "./app.module";

addAlias("@backend", __dirname);

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

  // eslint-disable-next-line @typescript-eslint/typedef
  const options = new DocumentBuilder()
    .setTitle("Work Solutions CRM")
    .setDescription("Work Solutions CRM API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  // eslint-disable-next-line @typescript-eslint/typedef
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/swagger", app, document);

  await app.listen(3000);
  console.info("Server up and running...");
}

bootstrap().catch((e: Error) => console.error(e));
