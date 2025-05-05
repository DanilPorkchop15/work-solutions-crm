import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

export interface ImportedUserRow {
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  position: string | null;
  role: Role | null;
}
