import { DocumentPreviewResponseDTO } from "@backend/app/document/document.dto";
import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentPreviewDTO } from "@work-solutions-crm/libs/shared/document/document.dto";
import { DocumentLogDTO } from "@work-solutions-crm/libs/shared/document-log/document-log.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

export class DocumentLogResponseDTO implements DocumentLogDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  comment: string;

  @ApiProperty({ type: () => DocumentPreviewResponseDTO })
  document: DocumentPreviewDTO;

  @ApiProperty({ type: () => UserPreviewResponseDTO })
  user: UserPreviewDTO;

  @ApiProperty()
  created_at: string;
}
