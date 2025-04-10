import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { StatsDTO } from "@work-solutions-crm/libs/shared/stats/stats.dto";
import { IsNumber } from "class-validator";

export class StatsValidationDTO implements StatsDTO {
  @ApiProperty({
    description: "The number of projects",
    example: 12,
    required: true
  })
  @IsNumber()
  readonly projects: number;

  @ApiPropertyOptional({
    description: "The number of active projects",
    example: 8,
    required: true
  })
  @IsNumber()
  readonly activeProjects: number;

  @ApiProperty({
    description: "The number of documents",
    example: 23,
    required: true
  })
  @IsNumber()
  readonly documents: number;

  @ApiProperty({
    description: "The number of customers",
    example: 15,
    required: true
  })
  @IsNumber()
  readonly customers: number;
}
