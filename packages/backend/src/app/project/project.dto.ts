import { CustomerPreviewResponseDTO } from "@backend/app/customer/customer.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";
import {
  ProjectBulkDeleteRequestDTO,
  ProjectBulkRestoreRequestDTO,
  ProjectCreateRequestDTO,
  ProjectUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO, ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
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

export class ProjectResponseDTO implements ProjectDTO {
  @ApiProperty({
    description: "The ID of project",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The name of project",
    example: "Example Project"
  })
  name: string;

  @ApiPropertyOptional({
    description: "The description of project",
    example: "This is an example project"
  })
  description?: string | undefined;

  @ApiProperty({
    description: "The start date of project",
    example: new Date()
  })
  start_date: string;

  @ApiProperty({
    description: "The end date of project",
    example: new Date()
  })
  end_date: string;

  @ApiPropertyOptional({
    description: "The budget of project",
    example: 1000
  })
  budget?: number | undefined;

  @ApiProperty({
    description: "The status of project",
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE
  })
  status: ProjectStatus;

  @ApiProperty({
    description: "The user who created the project",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The customer of project",
    type: () => CustomerPreviewResponseDTO
  })
  customer: CustomerPreviewDTO;

  @ApiProperty({
    description: "The users accountable for project",
    type: () => [UserPreviewResponseDTO]
  })
  users_accountable: UserPreviewDTO[];

  @ApiProperty({
    description: "The date when project was created",
    example: "2022-01-01T00:00:00.000Z"
  })
  created_at: string;

  @ApiProperty({
    description: "The date when project was updated",
    example: "2022-01-01T00:00:00.000Z"
  })
  updated_at: string;
}

export class ProjectPreviewResponseDTO implements ProjectPreviewDTO {
  @ApiProperty({
    description: "The ID of project",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The name of project",
    example: "Example Project"
  })
  name: string;

  @ApiProperty({
    description: "The start date of project",
    example: new Date()
  })
  start_date: string;

  @ApiProperty({
    description: "The end date of project",
    example: new Date()
  })
  end_date: string;

  @ApiPropertyOptional({
    description: "The budget of project",
    example: 1000
  })
  budget?: number | undefined;

  @ApiProperty({
    description: "The status of project",
    enum: ProjectStatus,
    example: ProjectStatus.ACTIVE
  })
  status: ProjectStatus;

  @ApiProperty({
    description: "The user who created the project",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The customer of project",
    type: () => CustomerPreviewResponseDTO
  })
  customer: CustomerPreviewDTO;

  @ApiProperty({
    description: "The users accountable for project",
    type: () => [UserPreviewResponseDTO]
  })
  users_accountable: UserPreviewDTO[];
}

export class ProjectBulkDeleteValidationDTO implements ProjectBulkDeleteRequestDTO {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: "Project ids",
    required: true,
    example: ["projectId"],
    type: [String]
  })
  project_ids: string[];
}

export class ProjectBulkRestoreValidationDTO implements ProjectBulkRestoreRequestDTO {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: "Project ids",
    required: true,
    example: ["projectId"],
    type: [String]
  })
  project_ids: string[];
}
