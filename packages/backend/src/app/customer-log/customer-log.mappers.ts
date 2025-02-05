import { CustomerLogDTO } from "@work-solutions-crm/libs/shared/customer-log/customer-log.dto";

import { CustomerLog } from "../../models/entities/customer-log.entity";
import { mapCustomerToPreviewDTO } from "../customer/customer.mappers";
import { mapUserToPreviewDTO } from "../user/user.mappers";

export function mapCustomerLogToDTO(log: CustomerLog): CustomerLogDTO {
  return {
    id: log.customer_log_id,
    action: log.action,
    comment: log.comment,
    user: mapUserToPreviewDTO(log.user),
    customer: mapCustomerToPreviewDTO(log.customer),
    created_at: log.created_at.toISOString()
  };
}
