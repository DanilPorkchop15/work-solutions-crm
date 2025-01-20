import { UserDTO } from "../user/user.dto";

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDTO extends TokenDTO {
  user: UserDTO;
}
