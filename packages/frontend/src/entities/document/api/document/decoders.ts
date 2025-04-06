import { userPreviewDecoder } from "@frontend/entities/@common/user";
import { Document, DocumentPreview } from "@frontend/entities/document";
import { enumDecoder, fieldOrFallback } from "@frontend/shared/api";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import Decoder, { array, field, string, succeed } from "jsonous";

export const documentPreviewDecoder: Decoder<DocumentPreview> = succeed({})
  .assign("id", field("id", string))
  .assign("name", field("name", string))
  .assign("userCreated", field("user_created", userPreviewDecoder))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));

export const documentDecoder: Decoder<Document> = documentPreviewDecoder
  .assign("description", fieldOrFallback("description", string))
  .assign("roles", field("roles", array(enumDecoder(Role))));
