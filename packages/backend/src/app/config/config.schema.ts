import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested
} from "class-validator";

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  readonly host: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly port: number = 5432;

  @IsString()
  @IsNotEmpty()
  readonly database: string = "postgres";

  @IsString()
  @IsNotEmpty()
  readonly username: string = "postgres";

  @IsString()
  @IsDefined()
  readonly password: string = "";
}

export class AuthenticationConfig {
  @IsString()
  @IsOptional()
  readonly secret: string = "secret";

  @IsString()
  @IsOptional()
  readonly algorithm: string = "HS256";
}

export class AdminConfig {
  @IsString()
  @IsOptional()
  readonly email: string = process.env.ADMIN_EMAIL ?? "admin@worksolutions.ru";

  @IsString()
  @IsOptional()
  readonly password: string = process.env.ADMIN_PASSWORD ?? "worksolutions";
}

export class ApplicationConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig;

  @IsBoolean()
  @IsDefined()
  readonly corsEnabled: boolean = false;

  @IsString()
  @IsOptional()
  readonly uploadsDir: string = "./uploads";

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthenticationConfig)
  readonly authentication: AuthenticationConfig;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdminConfig)
  readonly admin: AdminConfig;
}

export interface Version {
  version: string | null;

  branch: string | null;

  commit: string | null;

  buildTime: string | null;
}
