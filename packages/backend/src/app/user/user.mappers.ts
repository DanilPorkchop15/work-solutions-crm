import { typeormDateToIsoString, typeormNullableDateToIsoString } from "@backend/common/typeorm-date-to-iso-string";
import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import * as bcrypt from "bcryptjs";
import { DeepPartial } from "typeorm";

import { User } from "../../models/entities/user.entity";

export function mapUserToPreviewDTO(user: User): UserPreviewDTO {
  return {
    id: user.user_id,
    avatar_url: user.avatar_url,
    email: user.email,
    full_name: user.full_name,
    position: user.position,
    deleted_at: typeormNullableDateToIsoString(user.deleted_at)
  };
}

export function mapUserToDTO(user: User): UserDTO {
  return {
    id: user.user_id,
    avatar_url: user.avatar_url,
    email: user.email,
    full_name: user.full_name,
    position: user.position,
    role: user.role,
    created_at: typeormDateToIsoString(user.created_at),
    updated_at: typeormDateToIsoString(user.updated_at),
    deleted_at: typeormNullableDateToIsoString(user.deleted_at)
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
