import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserDTO } from "@work-solutions-crm/libs/shared/users/users.dto";
import * as bcrypt from "bcryptjs";

import { User } from "../../models/entities/user.entity";
import { mapUserToDTO } from "../users/users.mappers";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(userInfo: LoginRequestDTO): Promise<LoginDTO> {
    const user: User | null = await this.validateUser(userInfo.email, userInfo.password);
    if (!user) {
      throw new ForbiddenException("Invalid credentials");
    }
    const userDTO: UserDTO = mapUserToDTO(user);
    return {
      user: userDTO,
      token: this.jwtService.sign(userDTO)
    };
  }

  authenticate(token: string): UserDTO {
    try {
      return this.jwtService.verify<UserDTO>(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
