import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";

import { Project } from "../../models/entities/project.entity";
import { mapCustomerToPreviewDTO } from "../customer/customer.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapProjectToDTO(project: Project): ProjectDTO {
  return {
    id: project.project_id,
    name: project.name,
    description: project.description,
    start_date: typeormDateToIsoString(project.start_date),
    end_date: typeormDateToIsoString(project.end_date),
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO),
    created_at: typeormDateToIsoString(project.created_at),
    updated_at: typeormDateToIsoString(project.updated_at),
    deleted_at: typeormNullableDateToIsoString(project.deleted_at)
  };
}

export function mapProjectToPreviewDTO(project: Project): ProjectPreviewDTO {
  return {
    id: project.project_id,
    name: project.name,
    start_date: typeormDateToIsoString(project.start_date),
    end_date: typeormDateToIsoString(project.end_date),
    budget: project.budget,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO),
    deleted_at: typeormNullableDateToIsoString(project.deleted_at)
  };
}
