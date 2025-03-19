import Decoder, { array, boolean, field, number, string, succeed } from "jsonous";
import { assoc, toLower } from "ramda";

import { decodeNumberToString, fieldOrFallback, mediaDecoder } from "shared/api";

import { type Author, type BackendRole, type User, UserRole } from "../interfaces";

const roleDecoder: Decoder<UserRole> = field("role", string).map((role) =>
  toLower(role) === "admin" ? UserRole.Admin : UserRole.Student,
);

export const userDecoder: Decoder<User> = succeed({})
  .assign("id", field("id", decodeNumberToString))
  .assign("avatar", fieldOrFallback("avatar", mediaDecoder))
  .assign("firstName", field("firstName", string))
  .assign("lastName", field("lastName", string))
  .assign("blocked", field("blocked", boolean))
  .assign("email", field("email", string))
  .assign("role", roleDecoder)
  .map((user) => assoc("fullName", user.firstName + " " + user.lastName, user));

export const backendRolesDecoder: Decoder<BackendRole[]> = field(
  "roles",
  array(succeed({}).assign("id", field("id", number)).assign("name", field("name", string))),
);

export const authorDecoder: Decoder<Author> = succeed({})
  .assign("firstName", field("firstName", string))
  .assign("lastName", field("lastName", string))
  .map((user) => assoc("fullName", user.firstName + " " + user.lastName, user));
