export enum Role {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
  MODERATOR = "moderator"
}

export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  avatar_url?: string;
  role: Role;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type UserPreviewDTO = Omit<UserDTO, "role" | "created_at" | "updated_at">;
