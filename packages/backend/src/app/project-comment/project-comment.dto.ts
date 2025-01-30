import { UserPreviewResponseDTO } from "@backend/app/user/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  ProjectCommentCreateRequestDTO,
  ProjectCommentUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/project-comment/project-comment.api";
import { ProjectCommentDTO } from "@work-solutions-crm/libs/shared/project-comment/project-comment.dto";
import { UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";

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

export class ProjectCommentResponseDTO implements ProjectCommentDTO {
  @ApiProperty({
    description: "Comment ID",
    example: "c7d2ee27-0a5d-4c5d-a3ca-66d9b2b6c5a1",
    required: true
  })
  id: string;

  @ApiProperty({
    description: "User who left the comment",
    type: () => UserPreviewResponseDTO,
    required: true
  })
  user: UserPreviewDTO;

  @ApiProperty({
    description: "Comment text",
    example: "Comment text",
    required: true
  })
  text: string;

  @ApiProperty({
    description: "Comment creation date",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  created_at: string;

  @ApiProperty({
    description: "Comment update date",
    example: "2022-01-01T00:00:00.000Z",
    required: true
  })
  updated_at: string;
}
