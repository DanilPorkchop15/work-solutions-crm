import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentVersionDTO } from "@work-solutions-crm/libs/shared/document-version/document-version.dto";

export class DocumentVersionResponseDTO implements DocumentVersionDTO {
  @ApiProperty({ description: "The unique identifier of the document version", example: "a1b2c3d4" })
  id: string;

  @ApiProperty({ description: "The URL to access the document version", example: "http://example.com/document.pdf" })
  document_url: string;

  @ApiProperty({ description: "The version of the document", example: 1 })
  version: number;

  @ApiProperty({ description: "The user who created this version", type: () => UserPreviewResponseDTO })
  user_created: UserPreviewResponseDTO;

  @ApiProperty({ description: "The date when this version was created", example: "2022-01-01T00:00:00.000Z" })
  created_at: string;

  @ApiProperty({ description: "The date when this version was last updated", example: "2022-01-01T00:00:00.000Z" })
  updated_at: string;
}
