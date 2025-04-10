import { ProjectCreateRequestDTO, ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";

import type { ProjectCreateFormValues, ProjectUpdateFormValues } from "../interfaces";

export const mapProjectCreateFormValuesToCreateProjectDto = (
  values: ProjectCreateFormValues
): ProjectCreateRequestDTO => ({
  name: values.name,
  description: values.description,
  start_date: values.start_date,
  end_date: values.end_date,
  budget: values.budget,
  customer_id: values.customer_id,
  users_accountable: values.users_accountable.map(id => ({ id })),
  status: values.status
});

export const mapProjectUpdateFormValuesToUpdateProjectDto = (
  values: ProjectUpdateFormValues
): ProjectUpdateRequestDTO => ({
  name: values.name,
  description: values.description,
  start_date: values.start_date,
  end_date: values.end_date,
  budget: values.budget,
  customer_id: values.customer_id,
  users_accountable: values.users_accountable.map(id => ({ id })),
  status: values.status
});
