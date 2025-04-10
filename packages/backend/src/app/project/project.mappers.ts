import { ProjectCreateRequestDTO, ProjectUpdateRequestDTO } from "@work-solutions-crm/libs/shared/project/project.api";
import { ProjectDTO, ProjectPreviewDTO } from "@work-solutions-crm/libs/shared/project/project.dto";
import { DeepPartial } from "typeorm";

import { typeormDateToIsoString, typeormNullableDateToIsoString } from "../../common/typeorm-date-to-iso-string";
import { toFloat } from "../../common/typeorm-to-float";
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
    budget: project.budget ? toFloat(project.budget) : undefined,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user_created),
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
    budget: project.budget ? toFloat(project.budget) : undefined,
    status: project.status,
    user_created: mapUserToPreviewDTO(project.user_created),
    customer: mapCustomerToPreviewDTO(project.customer),
    users_accountable: project.users_accountable.map(mapUserToPreviewDTO),
    deleted_at: typeormNullableDateToIsoString(project.deleted_at)
  };
}

export function mapCreateOrUpdateProjectDtoToProject(
  dto: ProjectCreateRequestDTO | ProjectUpdateRequestDTO
): DeepPartial<Project> {
  return {
    name: dto.name,
    description: dto.description,
    start_date: dto.start_date,
    end_date: dto.end_date,
    budget: dto.budget,
    customer: { customer_id: dto.customer_id },
    users_accountable: dto.users_accountable?.map(({ id }) => ({ user_id: id })),
    status: dto.status
  };
}
