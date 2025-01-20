import { Request } from "express";

import { User } from "../../models/entities/user.entity";

export interface AuthRequest extends Request {
  user?: User;
}
