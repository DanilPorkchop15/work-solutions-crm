import { ApiProperty } from "@nestjs/swagger";
import {
  TaskCommentCreateRequestDTO,
  TaskCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/task-comment/task-comment.api";

export class TaskCommentCreateValidationDTO implements TaskCommentCreateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}

export class TaskCommentUpdateValidationDTO implements TaskCommentUpdateRequestDTO {
  @ApiProperty({
    required: true,
    type: "string",
    format: "text",
    description: "Comment text",
    example: "Comment text"
  })
  text: string;
}
