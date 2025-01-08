import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/projects/projects.dto";

import { Project } from "../../models/entities/project.entity";
import { mapCustomerToPreviewDTO } from "../customers/customers.mappers";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapProjectToDTO(project: Project): ProjectDTO {
  return {
    id: project.project_id,
    name: project.name,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO),
    createdAt: project.created_at,
    updatedAt: project.updated_at
  };
}

export function mapProjectToPreviewDTO(project: Project): ProjectPreviewDTO {
  return {
    id: project.project_id,
    name: project.name,
    start_date: project.start_date,
    end_date: project.end_date,
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO)
  };
}
