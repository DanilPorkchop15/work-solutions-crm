import { ApiProperty } from "@nestjs/swagger";
import {
  ProjectCommentCreateRequestDTO,
  ProjectCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";

export class ProjectCommentCreateValidationDTO implements ProjectCommentCreateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}

export class ProjectCommentUpdateValidationDTO implements ProjectCommentUpdateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}
