import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customer/customer.dto";

import { Customer } from "../../models/entities/customer.entity";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapCustomerToDTO(customer: Customer): CustomerDTO {
  return {
    id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    inn: customer.inn,
    website: customer.website,
    user_created: mapUserToPreviewDTO(customer.user_created),
    created_at: typeormDateToIsoString(customer.created_at),
    updated_at: typeormDateToIsoString(customer.updated_at),
    deleted_at: typeormNullableDateToIsoString(customer.deleted_at)
  };
}

export function mapCustomerToPreviewDTO(customer: Customer): CustomerPreviewDTO {
  return {
    id: customer.customer_id,
    name: customer.name,
    user_created: mapUserToPreviewDTO(customer.user_created),
    email: customer.email,
    deleted_at: typeormNullableDateToIsoString(customer.deleted_at)
  };
}
