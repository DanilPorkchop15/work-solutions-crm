import { ApiProperty } from "@nestjs/swagger";
import {
  DocumentCommentCreateRequestDTO,
  DocumentCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/document-comment/document-comment.api";

export class DocumentCommentCreateValidationDTO implements DocumentCommentCreateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}

export class DocumentCommentUpdateValidationDTO implements DocumentCommentUpdateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}
