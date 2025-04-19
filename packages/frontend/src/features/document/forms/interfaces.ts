import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";

export interface DocumentCreateFormValues {
  name: string;
  description?: string;
  document_url: string;
  roles: Role[];
}

export type DocumentUpdateFormValues = Partial<DocumentCreateFormValues>;
