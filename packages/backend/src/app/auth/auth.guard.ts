import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

import { User } from "../../models/entities/user.entity";
import { UserService } from "../user/user.service";

import { AuthService } from "./auth.service";
import { AuthRequest, Tokens } from "./auth.types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest<AuthRequest>();
    const response: Response = context.switchToHttp().getResponse<Response>();

    const accessToken: string | undefined = this.extractTokenFromCookies(request);
    const refreshToken: string | undefined = request.cookies["refreshToken"] as string;

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException("No tokens provided");
    }

    try {
      const decodedAccessToken: User = this.jwtService.verify<User>(accessToken!);

      response.cookie("accessToken", `Bearer ${accessToken}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15
      });
      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      const user: User | null = await this.authService.actualizeUser(decodedAccessToken);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      request.user = user;
      return true;
    } catch (accessTokenError) {
      try {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken }: Tokens =
          await this.authService.refresh(refreshToken);

        response.cookie("accessToken", `Bearer ${newAccessToken}`, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 15
        });
        response.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000
        });

        request.user = this.jwtService.verify<User>(newAccessToken);
        return true;
      } catch (refreshTokenError) {
        throw new UnauthorizedException("Invalid refresh token");
      }
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const accessToken: string | undefined = request.cookies["accessToken"] as string;
    const [type, token]: string[] = accessToken?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
