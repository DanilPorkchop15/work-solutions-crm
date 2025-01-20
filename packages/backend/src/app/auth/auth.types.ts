import { UserDTO } from "@work-solutions-crm/libs/shared/users/users.dto";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: UserDTO;
}
