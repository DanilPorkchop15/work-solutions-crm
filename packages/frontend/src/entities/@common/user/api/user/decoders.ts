import { enumDecoder, fieldOrFallback } from "@frontend/shared/api";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import Decoder, { array, boolean, field, string, succeed } from "jsonous";

import { Permission, type User, UserPreview, UserWithPermissions } from "../../interfaces";

export const userPreviewDecoder: Decoder<UserPreview> = succeed({})
  .assign("id", field("id", string))
  .assign("avatarUrl", fieldOrFallback("avatar_url", string))
  .assign("fullName", field("full_name", string))
  .assign("email", field("email", string))
  .assign("position", fieldOrFallback("position", string))
  .assign("deletedAt", fieldOrFallback("deleted_at", string));

export const userDecoder: Decoder<User> = userPreviewDecoder
  .assign("role", field("role", enumDecoder(Role)))
  .assign("createdAt", field("created_at", string))
  .assign("updatedAt", field("updated_at", string));

const permissionDecoder: Decoder<Permission> = succeed({})
  .assign("subject", field("subject", enumDecoder(Subject)))
  .assign("action", field("action", enumDecoder(Action)))
  .assign("inverted", field("inverted", boolean));

export const userWithPermissionsDecoder: Decoder<UserWithPermissions> = userDecoder.assign(
  "permissions",
  field("permissions", array(permissionDecoder))
);
