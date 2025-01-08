import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateRequestDTO, UserUpdateRequestDTO } from "@work-solutions-crm/libs/shared/users/users.api";
import { UserDTO, UserPreviewDTO } from "@work-solutions-crm/libs/shared/users/users.dto";
import { DeepPartial, Repository } from "typeorm";

import { User } from "../../models/entities/user.entity";

import {
  mapCreateRequestDTOToUser,
  mapUpdateRequestDTOToUser,
  mapUserToDTO,
  mapUserToPreviewDTO
} from "./users.mappers";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<UserPreviewDTO[]> {
    const users: User[] = await this.userRepository.find();
    return users.map(mapUserToPreviewDTO);
  }

  async bulkCreate(dto: UserCreateRequestDTO[]): Promise<UserPreviewDTO[]> {
    const users: DeepPartial<User[]> = dto.map(mapCreateRequestDTOToUser);
    const createdUsers: User[] = await this.userRepository.save(users);
    return createdUsers.map(mapUserToPreviewDTO);
  }

  async update(userId: string, dto: UserUpdateRequestDTO): Promise<UserDTO> {
    const partialUser: DeepPartial<User> = mapUpdateRequestDTOToUser(dto);
    await this.userRepository.update(userId, partialUser);
    const updatedUser: User | null = await this.userRepository.findOne({ where: { user_id: userId } });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return mapUserToDTO(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.softDelete(userId);
  }

  async restore(userId: string): Promise<void> {
    await this.userRepository.restore(userId);
  }
}

//TODO add changeRole method
