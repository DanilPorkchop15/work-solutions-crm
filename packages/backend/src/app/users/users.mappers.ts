import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/users/users.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/users/users.dto";
import * as bcrypt from "bcrypt";
import { DeepPartial } from "typeorm";

import { User } from "../../models/entities/user.entity";

export function mapUserToPreviewDTO(user: User): UserPreviewDTO {
  return {
    id: user.user_id,
    avatarUrl: user.avatar_url,
    email: user.email,
    fullName: user.full_name,
    position: user.position
  };
}

export function mapUserToDTO(user: User): UserDTO {
  return {
    id: user.user_id,
    avatarUrl: user.avatar_url,
    email: user.email,
    fullName: user.full_name,
    position: user.position,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
}

export function mapUpdateRequestDTOToUser(dto: UserUpdateRequestDTO): DeepPartial<User> {
  return {
    avatar_url: dto.avatarUrl,
    email: dto.email,
    full_name: dto.fullName,
    position: dto.position
  };
}

export async function mapCreateRequestDTOToUser(dto: UserCreateRequestDTO): Promise<DeepPartial<User>> {
  return {
    avatar_url: dto.avatarUrl,
    email: dto.email,
    password: await bcrypt.hash(dto.password, 10),
    full_name: dto.fullName,
    position: dto.position,
    role: dto.role
  };
}
