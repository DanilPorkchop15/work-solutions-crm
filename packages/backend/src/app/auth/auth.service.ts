import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO, TokenDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
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
    const user: User | null = await this.usersService.findOneByEmail(email);
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
    const accessToken: string = this.jwtService.sign(userDTO, { expiresIn: "15m" });
    const refreshToken: string = this.jwtService.sign(userDTO, { expiresIn: "7d" });

    await this.usersService.updateRefreshToken(user.user_id, refreshToken);

    return {
      user: userDTO,
      accessToken: accessToken,
      refreshToken
    };
  }

  authenticate(token: string): UserDTO {
    try {
      return this.jwtService.verify<UserDTO>(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  async refresh(refreshToken: string): Promise<TokenDTO> {
    try {
      const payload: UserDTO = this.jwtService.verify<UserDTO>(refreshToken);
      const user: User | null = await this.usersService.findOneById(payload.id);

      if (!user || user.refresh_token !== refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const newAccessToken: string = this.jwtService.sign(mapUserToDTO(user), { expiresIn: "15m" });
      return { accessToken: newAccessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
