import type { UserRole } from "./domain";

export interface UsersFilter {
  role?: UserRole[];
}
