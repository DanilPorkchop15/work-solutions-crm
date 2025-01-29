import { CustomerPreviewDTO } from "../customer/customer.dto";
import { UserPreviewDTO } from "../user/user.dto";

export interface CustomerLogDTO {
  id: string;
  action: string;
  comment?: string;
  user: UserPreviewDTO;
  customer: CustomerPreviewDTO;
  created_at: string;
}
