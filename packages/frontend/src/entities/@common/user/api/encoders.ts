import { always, assoc, assocPath, complement, equals, ifElse, isEmpty, pickBy, pipe } from "ramda";

import type { Pagination, Sorting } from "shared/model/interfaces";

import type { CreateUserDto, UpdateUserDto, UsersFilter } from "../interfaces";

export const encodeUsersFilter = ({ role, ...params }: Pagination & Sorting<string> & UsersFilter) =>
  role ? assocPath(["filters", "role", "name", "$in"], role, params) : params;

export const encodeCreateUserDto = ({ roleId, ...dto }: Omit<CreateUserDto, "role"> & { roleId: number }) =>
  pipe(
    assoc("role", {
      disconnect: [],
      connect: [{ id: roleId, position: { end: true } }],
    }),
    assoc("username", dto.email),
  )(dto);

export const encodeUpdateUserDto = ({
  oldRoleId,
  newRoleId,
  ...dto
}: Omit<UpdateUserDto, "oldRole" | "role"> & {
  oldRoleId: number;
  newRoleId: number;
}) =>
  pipe(
    ifElse(
      always(equals(oldRoleId, newRoleId)),
      always(dto),
      assoc("role", {
        disconnect: [{ id: oldRoleId }],
        connect: [{ id: newRoleId, position: { end: true } }],
      }),
    ),
    pickBy(complement(isEmpty)),
  )(dto);
