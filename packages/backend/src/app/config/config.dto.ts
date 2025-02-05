import { Version } from "@backend/app/config/config.schema";
import { ApiProperty } from "@nestjs/swagger";

export class VersionResponseDTO implements Version {
  @ApiProperty({
    description: "The branch of the application",
    example: "main",
    required: true
  })
  readonly branch: string | null;

  @ApiProperty({
    description: "The build time of the application",
    example: "2023-02-07T14:30:00.000Z",
    required: true
  })
  readonly buildTime: string | null;

  @ApiProperty({
    description: "The commit hash of the application",
    example: "1234567890abcdef",
    required: true
  })
  readonly commit: string | null;

  @ApiProperty({
    description: "The version of the application",
    example: "1.0.0",
    required: true
  })
  readonly version: string | null;
}
