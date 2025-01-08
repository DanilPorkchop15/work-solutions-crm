import { UserDTO } from "../users/users.dto";

export interface LoginDTO {
  token: string;
  user: UserDTO;
}
