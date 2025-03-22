import { UserPreviewDTO } from "../user/user.dto";

export interface CustomerDTO {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  inn?: string;
  website?: string;
  user_created: UserPreviewDTO;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type CustomerPreviewDTO = Pick<CustomerDTO, "id" | "name" | "user_created" | "email" | "deleted_at">;
