import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO, TokenDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import * as bcrypt from "bcryptjs";

import { User } from "../../models/entities/user.entity";
import { mapUserToDTO } from "../user/user.mappers";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
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

    const accessToken: string = this.jwtService.sign(user, { expiresIn: "15m" });
    const refreshToken: string = this.jwtService.sign(user, { expiresIn: "7d" });

    await this.usersService.updateRefreshToken(user.user_id, refreshToken);

    const userDTO: UserDTO = mapUserToDTO(user);

    return {
      user: userDTO,
      accessToken: accessToken,
      refreshToken
    };
  }

  authenticate(token: string): User {
    try {
      return this.jwtService.verify<User>(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  refresh(refreshToken: string): TokenDTO {
    try {
      const user: User = this.jwtService.verify<User>(refreshToken);

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
