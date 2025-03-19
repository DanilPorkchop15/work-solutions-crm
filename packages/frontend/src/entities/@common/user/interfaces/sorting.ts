import type { Sorting } from "shared/model/interfaces";

export type UsersSortingKeys = "blocked" | "lastName";

export type UsersSorting = Sorting<UsersSortingKeys>;
