import { memoizeWith, prop, toUpper } from "ramda";

import type { User } from "./interfaces";

export const getUserInitials: (user: User) => string = memoizeWith(prop("fullName"), (user) =>
  toUpper(user.lastName[0] + user.firstName[0]),
);
