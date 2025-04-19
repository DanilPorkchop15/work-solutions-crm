import { enumDecoder, fieldOrFallback } from "@frontend/shared/api";
import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";
import Decoder, { array, field, number, string, succeed } from "jsonous";

import { userPreviewDecoder } from "../../../@common/user";
import { customerPreviewDecoder } from "../../../customer";
import { Project, ProjectPreview } from "../../interfaces";

export const projectPreviewDecoder: Decoder<ProjectPreview> = succeed({})
  .assign("id", field("id", string))
  .assign("name", field("name", string))
  .assign("startDate", field("start_date", string))
  .assign("endDate", field("end_date", string))
  .assign("budget", fieldOrFallback("budget", number))
  .assign("status", field("status", enumDecoder(ProjectStatus)))
  .assign("userCreated", field("user_created", userPreviewDecoder))
  .assign("customer", field("customer", customerPreviewDecoder))
  .assign("usersAccountable", field("users_accountable", array(userPreviewDecoder)))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));

export const projectDecoder: Decoder<Project> = projectPreviewDecoder
  .assign("description", fieldOrFallback("description", string))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string));
