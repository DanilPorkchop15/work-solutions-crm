import { UserDTO } from "../users/users.dto";

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDTO extends TokenDTO {
  user: UserDTO;
}
