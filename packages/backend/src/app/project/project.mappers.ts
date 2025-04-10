import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";

import { Project } from "../../models/entities/project.entity";
import { mapCustomerToPreviewDTO } from "../customer/customer.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapProjectToDTO(project: Project): ProjectDTO {
  return {
    id: project.project_id,
    name: project.name,
    description: project.description,
    start_date: project.start_date.toISOString(),
    end_date: project.end_date.toISOString(),
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO),
    created_at: project.created_at.toISOString(),
    updated_at: project.updated_at.toISOString()
  };
}

export function mapProjectToPreviewDTO(project: Project): ProjectPreviewDTO {
  return {
    id: project.project_id,
    name: project.name,
    start_date: project.start_date.toISOString(),
    end_date: project.end_date.toISOString(),
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO)
  };
}
