import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskCreateRequestDTO, TaskUpdateRequestDTO } from "@work-solutions-crm/libs/shared/task/task.api";
import { TaskStatus } from "@work-solutions-crm/libs/shared/task/task.dto";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class TaskUserAccountableDTO {
  @ApiProperty({
    description: "User id",
    example: "userId",
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class TaskCreateValidationDTO implements TaskCreateRequestDTO {
  @ApiProperty({
    description: "Task name",
    example: "Task name",
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: "Task description",
    example: "Task description",
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string | undefined;

  @ApiPropertyOptional({
    description: "Task start date",
    example: new Date(),
    type: Date
  })
  @IsDate()
  @IsOptional()
  start_date?: string | undefined;

  @ApiPropertyOptional({
    description: "Task end date",
    example: new Date(),
    type: Date
  })
  @IsDate()
  @IsOptional()
  end_date?: string | undefined;

  @ApiPropertyOptional({
    description: "Task time spent",
    example: 10,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  time_spent?: number | undefined;

  @ApiPropertyOptional({
    description: "Task estimated time",
    example: 10,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  estimated_time?: number | undefined;

  @ApiProperty({
    description: "Project id",
    example: "projectId",
    type: String,
    required: true
  })
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: "Users accountable",
    example: [{ id: "userId" }],
    type: [TaskUserAccountableDTO],
    required: true
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  users_accountable: TaskUserAccountableDTO[];

  @ApiPropertyOptional({
    description: "Task status",
    enum: TaskStatus,
    example: TaskStatus.ACTIVE
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus | undefined;
}

export class TaskUpdateValidationDTO implements TaskUpdateRequestDTO {
  @ApiPropertyOptional({
    description: "Task name",
    example: "Task name",
    type: String
  })
  @IsString()
  @IsOptional()
  name?: string | undefined;

  @ApiPropertyOptional({
    description: "Task description",
    example: "Task description",
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string | undefined;

  @ApiPropertyOptional({
    description: "Task start date",
    example: new Date(),
    type: Date
  })
  @IsDate()
  @IsOptional()
  start_date?: string | undefined;

  @ApiPropertyOptional({
    description: "Task end date",
    example: new Date(),
    type: Date
  })
  @IsDate()
  @IsOptional()
  end_date?: string | undefined;

  @ApiPropertyOptional({
    description: "Task time spent",
    example: 10,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  time_spent?: number | undefined;

  @ApiPropertyOptional({
    description: "Task estimated time",
    example: 10,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  estimated_time?: number | undefined;

  @ApiPropertyOptional({
    description: "Project id",
    example: "projectId",
    type: String
  })
  @IsString()
  @IsOptional()
  project_id?: string | undefined;

  @ApiPropertyOptional({
    description: "Users accountable",
    example: [{ id: "userId" }],
    type: [TaskUserAccountableDTO]
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  users_accountable?: TaskUserAccountableDTO[] | undefined;

  @ApiPropertyOptional({
    description: "Task status",
    enum: TaskStatus,
    example: TaskStatus.ACTIVE
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus | undefined;
}
