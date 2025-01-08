import { UserPreviewDTO } from "../users/users.dto";

export interface CustomerDTO {
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  inn?: string;
  website?: string;
  user_created: UserPreviewDTO;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerPreviewDTO = Pick<CustomerDTO, "id" | "name" | "user_created" | "email">;
