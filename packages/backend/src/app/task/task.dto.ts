import { ProjectPreviewResponseDTO } from "@backend/app/project/project.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";
import {
  TaskBulkDeleteRequestDTO,
  TaskBulkRestoreRequestDTO,
  TaskCreateRequestDTO,
  TaskUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/task/task.api";
import { TaskDTO, TaskPreviewDTO, TaskStatus } from "@work-solutions-crm/libs/shared/task/task.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
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

export class TaskResponseDTO implements TaskDTO {
  @ApiProperty({
    description: "The ID of task",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiProperty({
    description: "The name of task",
    example: "Example Task"
  })
  name: string;

  @ApiPropertyOptional({
    description: "The description of task",
    example: "This is an example task"
  })
  description?: string | undefined;

  @ApiProperty({
    description: "The status of task",
    enum: TaskStatus,
    example: TaskStatus.ACTIVE
  })
  status: TaskStatus;

  @ApiPropertyOptional({
    description: "The start date of task",
    example: new Date(),
    type: Date
  })
  start_date?: string | undefined;

  @ApiPropertyOptional({
    description: "The end date of task",
    example: new Date(),
    type: Date
  })
  end_date?: string | undefined;

  @ApiPropertyOptional({
    description: "The time spent on task",
    example: 10,
    type: Number
  })
  time_spent?: number | undefined;

  @ApiPropertyOptional({
    description: "The estimated time of task",
    example: 10,
    type: Number
  })
  estimated_time?: number | undefined;

  @ApiProperty({
    description: "The user who created the task",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The project of task",
    type: () => ProjectPreviewResponseDTO
  })
  project: ProjectPreviewDTO;

  @ApiProperty({
    description: "The users accountable for task",
    type: () => [UserPreviewResponseDTO]
  })
  users_accountable: UserPreviewDTO[];

  @ApiProperty({
    description: "The date and time when the task was created",
    example: "2022-01-01T12:00:00.000Z"
  })
  created_at: string;

  @ApiProperty({
    description: "The date and time when the task was updated",
    example: "2022-01-01T12:00:00.000Z"
  })
  updated_at: string;

  @ApiProperty({
    description: "The date and time when the task was deleted",
    example: "2022-01-01T12:00:00.000Z",
    required: false
  })
  deleted_at?: string | undefined;
}

export class TaskPreviewResponseDTO implements TaskPreviewDTO {
  @ApiProperty({
    description: "The name of task",
    example: "Example Task"
  })
  name: string;

  @ApiProperty({
    description: "The ID of task",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1"
  })
  id: string;

  @ApiPropertyOptional({
    description: "The start date of task",
    example: new Date(),
    type: Date
  })
  start_date?: string | undefined;

  @ApiPropertyOptional({
    description: "The end date of task",
    example: new Date(),
    type: Date
  })
  end_date?: string | undefined;

  @ApiPropertyOptional({
    description: "The time spent on task",
    example: 10,
    type: Number
  })
  time_spent?: number | undefined;

  @ApiPropertyOptional({
    description: "The estimated time of task",
    example: 10,
    type: Number
  })
  estimated_time?: number | undefined;

  @ApiProperty({
    description: "The users accountable for task",
    type: () => [UserPreviewResponseDTO]
  })
  users_accountable: UserPreviewDTO[];

  @ApiProperty({
    description: "The status of task",
    enum: TaskStatus,
    example: TaskStatus.ACTIVE
  })
  status: TaskStatus;

  @ApiProperty({
    description: "The user who created the task",
    type: () => UserPreviewResponseDTO
  })
  user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The project of task",
    type: () => ProjectPreviewResponseDTO
  })
  project: ProjectPreviewDTO;

  @ApiProperty({
    description: "The date and time when the task was deleted",
    example: "2022-01-01T12:00:00.000Z",
    required: false
  })
  deleted_at?: string;
}

export class TaskBulkDeleteValidationDTO implements TaskBulkDeleteRequestDTO {
  @ApiProperty({
    description: "Task ids",
    required: true,
    example: ["taskId"],
    type: [String]
  })
  @IsArray()
  @IsNotEmpty()
  task_ids: string[];
}

export class TaskBulkRestoreValidationDTO implements TaskBulkRestoreRequestDTO {
  @ApiProperty({
    description: "Task ids",
    required: true,
    example: ["taskId"],
    type: [String]
  })
  @IsArray()
  @IsNotEmpty()
  task_ids: string[];
}
