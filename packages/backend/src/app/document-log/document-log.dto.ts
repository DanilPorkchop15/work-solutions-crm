import { DocumentPreviewResponseDTO } from "@backend/app/document/document.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class DocumentLogResponseDTO implements DocumentLogDTO {
  @ApiProperty({
    description: "The unique identifier of the document log entry",
    example: "a1b2c3d4",
    type: String
  })
  id: string;

  @ApiProperty({
    description: "The action that was performed on the document (e.g. 'created', 'updated', 'deleted')",
    example: "created",
    type: String
  })
  action: string;

  @ApiProperty({
    description: "A comment or description of the action that was performed",
    example: "Document created",
    type: String
  })
  comment: string;

  @ApiProperty({
    description: "The document that the log entry refers to",
    type: () => DocumentPreviewResponseDTO
  })
  document: DocumentPreviewDTO;

  @ApiProperty({
    description: "The user who performed the action",
    type: () => UserPreviewResponseDTO
  })
  user: UserPreviewDTO;

  @ApiProperty({
    description: "The date and time when the action was performed",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  created_at: string;

  @ApiPropertyOptional({
    description: "The date and time when the document log entry was deleted",
    example: "2022-01-01T12:00:00.000Z",
    type: String
  })
  deleted_at?: string;
}
