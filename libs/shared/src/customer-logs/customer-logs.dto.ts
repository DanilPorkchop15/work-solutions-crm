import { CustomerPreviewDTO } from "../customers/customers.dto";
import { UserPreviewDTO } from "../users/users.dto";

export interface CustomerLogDTO {
  id: string;
  action: string;
  comment?: string;
  user: UserPreviewDTO;
  customer: CustomerPreviewDTO;
  created_at: Date;
}
