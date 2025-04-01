import {
  CustomerCreateRequestDTO,
  CustomerUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/customer/customer.api";

import type { CustomerCreateFormValues, CustomerUpdateFormValues } from "../interfaces";

export const mapCustomerCreateFormValuesToCreateCustomerDto = (
  values: CustomerCreateFormValues
): CustomerCreateRequestDTO => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  inn: values.inn,
  website: values.website
});

export const mapCustomerUpdateFormValuesToUpdateCustomerDto = (
  values: CustomerUpdateFormValues
): CustomerUpdateRequestDTO => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  inn: values.inn,
  website: values.website
});
