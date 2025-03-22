import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDTO } from "@work-solutions-crm/libs/shared/auth/auth.api";
import { LoginDTO, PermissionDTO, TokenDTO } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import * as bcrypt from "bcryptjs";

import { User } from "../../models/entities/user.entity";
import { mapUserToDTO } from "../user/user.mappers";
import { UserService } from "../user/user.service";
import { CaslAbilityFactory } from "@backend/app/permission/casl-ability.factory";
import { Tokens } from "@backend/app/auth/auth.types";
import { NotFoundError } from "rxjs";
import { toPlainObject } from "lodash";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory
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

    const accessToken: string = this.jwtService.sign(toPlainObject(user), { expiresIn: "15m" });
    const refreshToken: string = this.jwtService.sign(toPlainObject(user), { expiresIn: "7d" });

    await this.usersService.updateRefreshToken(user.user_id, refreshToken);

    const userDTO: UserDTO = mapUserToDTO(user);

    const ability = this.caslAbilityFactory.createForUser(user);

    const permissions: PermissionDTO[] = ability.rules.map(rule => ({
      action: rule.action,
      subject: rule.subject,
      conditions: rule.conditions || null,
      inverted: rule.inverted || false
    }));

    return {
      user: {
        ...userDTO,
        permissions
      },
      access_token: accessToken
    };
  }

  authenticate(token: string): User {
    try {
      return this.jwtService.verify<User>(token);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  refresh(refreshToken: string): Tokens {
    try {
      const user: User = this.jwtService.verify<User>(refreshToken);

      if (!user || user.refresh_token !== refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const newAccessToken: string = this.jwtService.sign(toPlainObject(user), { expiresIn: "15m" });
      return { accessToken: newAccessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async getRefreshToken(userId: string): Promise<string> {
    const user: User | null = await this.usersService.findOneById(userId);
    if (!user?.refresh_token) throw new NotFoundException("Session   not found");
    return user.refresh_token;
  }
}
