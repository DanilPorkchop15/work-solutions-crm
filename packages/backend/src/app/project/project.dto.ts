import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectCreateRequestDTO, ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from "class-validator";

export class UserAccountable {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User id",
    example: "userId",
    type: String,
    required: true
  })
  id: string;
}

export class ProjectCreateValidationDTO implements ProjectCreateRequestDTO {
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    description: "Project name",
    example: "Project name",
    minLength: 1,
    maxLength: 255
  })
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  @ApiPropertyOptional({
    description: "Project description",
    example: "Project description",
    minLength: 0,
    maxLength: 255
  })
  description?: string | undefined;

  @IsDate()
  @ApiProperty({
    description: "Project start date",
    example: "2022-01-01T00:00:00.000Z",
    type: Date
  })
  start_date: string;

  @IsDate()
  @ApiProperty({
    description: "Project end date",
    example: "2022-01-01T00:00:00.000Z",
    type: Date
  })
  end_date: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project budget",
    example: 1000,
    type: Number
  })
  budget?: number | undefined;

  @IsString()
  @Length(1, 255)
  @ApiProperty({
    description: "Customer id",
    example: "customerId",
    minLength: 1,
    maxLength: 255
  })
  customer_id: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project status",
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE
  })
  status?: ProjectStatus | undefined;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    description: "Users accountable",
    required: true,
    example: [{ id: "userId" }],
    type: [UserAccountable]
  })
  users_accountable: UserAccountable[];
}

export class ProjectUpdateValidationDTO implements ProjectUpdateRequestDTO {
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional({
    description: "Project name",
    example: "Example Project",
    minLength: 1,
    maxLength: 255
  })
  name?: string;

  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional({
    description: "Project description",
    example: "Example Project",
    minLength: 1,
    maxLength: 255
  })
  description?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project start date",
    example: new Date(),
    type: Date
  })
  start_date?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project end date",
    example: new Date(),
    type: Date
  })
  end_date?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project budget",
    example: 1000,
    type: Number
  })
  budget?: number;

  @IsEnum(ProjectStatus)
  @IsOptional()
  @ApiPropertyOptional({
    description: "Project status",
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE
  })
  status?: ProjectStatus;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({
    description: "Users accountable",
    example: [{ id: "userId" }],
    type: [UserAccountable]
  })
  users_accountable?: UserAccountable[];
}
