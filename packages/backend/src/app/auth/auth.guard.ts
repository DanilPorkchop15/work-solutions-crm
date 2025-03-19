import { AuthRequest, Tokens } from "@backend/app/auth/auth.types";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

import { User } from "../../models/entities/user.entity";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request: AuthRequest = context.switchToHttp().getRequest<AuthRequest>();
    const response: Response = context.switchToHttp().getResponse<Response>();

    const accessToken: string | undefined = this.extractTokenFromCookies(request);
    const refreshToken: string | undefined = request.cookies["refreshToken"] as string;

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException("No tokens provided");
    }

    try {
      if (!accessToken) return false;
      const payload: User = this.jwtService.verify<User>(accessToken);
      request.user = payload;
      return true;
    } catch (accessTokenError) {
      if (refreshToken) {
        try {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken }: Tokens =
            this.authService.refresh(refreshToken);

          response.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
          });

          response.setHeader("Authorization", `Bearer ${newAccessToken}`);

          const newPayload: User = this.jwtService.verify<User>(newAccessToken);
          request.user = newPayload;

          return true;
        } catch (refreshTokenError: any) {
          throw new UnauthorizedException("Invalid refresh token");
        }
      } else {
        throw new UnauthorizedException("Invalid access token");
      }
    }
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const accessToken: string | undefined = request.cookies["accessToken"] as string;
    const [type, token]: string[] = accessToken?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
