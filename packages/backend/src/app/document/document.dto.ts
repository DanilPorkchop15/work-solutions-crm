import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";
import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class DocumentCreateValidationDTO implements DocumentCreateRequestDTO {
  @ApiProperty({
    description: "The name of document",
    example: "Example Document",
    required: true
  })
  @IsString()
  @Length(1, 255)
  readonly name: string;

  @ApiPropertyOptional({
    description: "The description of document",
    example: "This is an example document",
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly description?: string;

  @ApiProperty({
    description: "The URL of document",
    example: "https://example.com/document.pdf",
    required: true
  })
  @IsUrl()
  readonly document_url: string;
}

export class DocumentUpdateValidationDTO implements DocumentUpdateRequestDTO {
  @ApiPropertyOptional({
    description: "The name of document",
    example: "Example Document",
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly name?: string;

  @ApiPropertyOptional({
    description: "The description of document",
    example: "This is an example document",
    required: false
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  readonly description?: string;

  @ApiPropertyOptional({
    description: "The URL of document",
    example: "https://example.com/document.pdf",
    required: false
  })
  @IsOptional()
  @IsUrl()
  readonly document_url?: string;
}
