import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/user/user.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import * as bcrypt from "bcryptjs";
import { DeepPartial } from "typeorm";

import { typeormDateToIsoString, typeormNullableDateToIsoString } from "../../common/typeorm-date-to-iso-string";
import { User } from "../../models/entities/user.entity";

export function mapUserToPreviewDTO(user: User): UserPreviewDTO {
  return {
    id: user.user_id,
    avatar_url: user.avatar_url,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    position: user.position,
    deleted_at: typeormNullableDateToIsoString(user.deleted_at)
  };
}

export function mapUserToDTO(user: User): UserDTO {
  return {
    id: user.user_id,
    avatar_url: user.avatar_url,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    position: user.position,
    role: user.role,
    created_at: typeormDateToIsoString(user.created_at),
    updated_at: typeormDateToIsoString(user.updated_at),
    deleted_at: typeormNullableDateToIsoString(user.deleted_at)
  };
}

export function mapUpdateRequestDTOToUser(dto: UserUpdateRequestDTO): DeepPartial<User> {
  return {
    avatar_url: dto.avatar_url,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    position: dto.position
  };
}

export async function mapCreateRequestDTOToUser(dto: UserCreateRequestDTO): Promise<DeepPartial<User>> {
  return {
    avatar_url: dto.avatar_url,
    email: dto.email,
    password: await bcrypt.hash(dto.password, 10),
    first_name: dto.first_name,
    last_name: dto.last_name,
    position: dto.position,
    role: dto.role
  };
}
