import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  DocumentBulkDeleteRequestDTO,
  DocumentBulkRestoreRequestDTO,
  DocumentCreateRequestDTO,
  DocumentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document/document.api";
import { DocumentDTO, DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";
import { Role, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import { IsArray, IsEnum, IsOptional, IsString, IsUrl, Length } from "class-validator";

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

  @ApiProperty({
    description: "The roles of document",
    example: ["user", "admin"],
    required: true
  })
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
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

export class DocumentResponseDTO implements DocumentDTO {
  @ApiProperty({
    description: "The ID of document",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
    required: true
  })
  readonly id: string;

  @ApiProperty({
    description: "The name of document",
    example: "Example Document",
    required: true
  })
  readonly name: string;

  @ApiPropertyOptional({
    description: "The description of document",
    example: "This is an example document",
    required: false
  })
  readonly description?: string | undefined;

  @ApiProperty({
    description: "The user who created the document",
    type: () => UserPreviewResponseDTO,
    required: true
  })
  readonly user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The date when the document was created",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  readonly created_at: string;

  @ApiProperty({
    description: "The date when the document was updated",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  readonly updated_at: string;

  @ApiPropertyOptional({
    description: "The date when the document was deleted",
    example: "2022-01-01T00:00:00.000Z",
    required: false
  })
  readonly deleted_at?: string | undefined;
}

export class DocumentPreviewResponseDTO implements DocumentPreviewDTO {
  @ApiProperty({
    description: "The name of document",
    example: "Example Document",
    required: true
  })
  readonly name: string;

  @ApiProperty({
    description: "The ID of document",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
    required: true
  })
  readonly id: string;

  @ApiProperty({
    description: "The user who created the document",
    type: () => UserPreviewResponseDTO,
    required: true
  })
  readonly user_created: UserPreviewDTO;

  @ApiProperty({
    description: "The date when the document was created",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  readonly created_at: string;

  @ApiProperty({
    description: "The date when the document was updated",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  readonly updated_at: string;

  @ApiPropertyOptional({
    description: "The date when the document was deleted",
    example: "2022-01-01T00:00:00.000Z"
  })
  readonly deleted_at?: string | undefined;
}

export class DocumentBulkDeleteValidationDTO implements DocumentBulkDeleteRequestDTO {
  @ApiProperty({
    description: "The IDs of documents to delete",
    example: ["c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1", "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a2"],
    required: true
  })
  readonly document_ids: string[];
}

export class DocumentBulkRestoreValidationDTO implements DocumentBulkRestoreRequestDTO {
  @ApiProperty({
    description: "The IDs of documents to restore",
    example: ["c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1", "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a2"],
    required: true
  })
  readonly document_ids: string[];
}
