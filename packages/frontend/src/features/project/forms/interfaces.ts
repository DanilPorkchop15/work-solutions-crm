import { ProjectStatus } from "@work-solutions-crm/libs/shared/project/project.dto";

export interface ProjectCreateFormValues {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  budget?: number;
  customer_id: string;
  users_accountable: string[];
  status?: ProjectStatus;
}

export type ProjectUpdateFormValues = ProjectCreateFormValues;
