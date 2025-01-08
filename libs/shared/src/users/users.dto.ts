export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator"
}

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  position?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPreviewDTO = Omit<UserDTO, "role" | "createdAt" | "updatedAt">;
