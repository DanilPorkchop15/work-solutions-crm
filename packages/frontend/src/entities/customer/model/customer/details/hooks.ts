import { isNil } from "ramda";

import { useInjectService } from "../../../../../shared/lib/useInjectService";
import type { Customer } from "../../../interfaces";

import { CustomerDetailsService } from "./service";

export function useCustomerDetails(): Customer {
  const customerDetails: Customer | null = useInjectService(CustomerDetailsService).customerDetails;

  if (isNil(customerDetails)) throw new Error("CustomerDetails not found");

  return customerDetails;
}
