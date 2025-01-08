import { CustomerDTO, CustomerPreviewDTO } from "@work-solutions-crm/libs/shared/customers/customers.dto";

import { Customer } from "../../models/entities/customer.entity";
import { mapUserToPreviewDTO } from "../users/users.mappers";

export function mapCustomerToDTO(customer: Customer): CustomerDTO {
  return {
    id: customer.customer_id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    inn: customer.inn,
    website: customer.website,
    user_created: mapUserToPreviewDTO(customer.user_created),
    createdAt: customer.created_at,
    updatedAt: customer.updated_at
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
