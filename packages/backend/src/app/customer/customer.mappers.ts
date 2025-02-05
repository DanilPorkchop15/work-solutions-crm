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
    created_at: customer.created_at.toISOString(),
    updated_at: customer.updated_at.toISOString()
  };
}

export function mapCustomerToPreviewDTO(customer: Customer): CustomerPreviewDTO {
  return {
    id: customer.customer_id,
    name: customer.name,
    user_created: mapUserToPreviewDTO(customer.user_created),
    email: customer.email
  };
}
