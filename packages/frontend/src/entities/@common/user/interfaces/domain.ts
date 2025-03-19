import type { Media, UniqueEntity } from "shared/model/interfaces";

export interface User extends UniqueEntity {
  avatar: Media | null;
  firstName: string;
  lastName: string;
  fullName: string;
  blocked: boolean;
  email: string;
  role: UserRole;
}

export type Author = Pick<User, "firstName" | "lastName" | "fullName">;

export enum UserRole {
  Admin = "Admin",
  Student = "Student",
}
