import { BadRequestException, Global, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  UserBulkDeleteRequestDTO,
  UserBulkRestoreRequestDTO,
  UserCreateRequestDTO,
  UserUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/user/user.api";
import { Role, UserDTO } from "@work-solutions-crm/libs/shared/user/user.dto";
import * as bcrypt from "bcryptjs";
import { DeepPartial, In, Repository } from "typeorm";

import { User } from "../../models/entities/user.entity";
import { ConfigService } from "../config/config.service";

import { mapCreateRequestDTOToUser, mapUpdateRequestDTOToUser, mapUserToDTO } from "./user.mappers";

@Global()
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userRepository.find({ withDeleted: true });
    return users.map(mapUserToDTO);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findOne({ where: { user_id: id }, withDeleted: true });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOneByRefreshToken(refreshToken: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(dto: UserCreateRequestDTO): Promise<UserDTO> {
    const user: DeepPartial<User> = await mapCreateRequestDTOToUser(dto);

    const existingUser: User | null = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      return mapUserToDTO(existingUser);
    }
    const createdUser: User = await this.userRepository.save(user);
    return mapUserToDTO(createdUser);
  }

  async bulkCreate(dto: UserCreateRequestDTO[]): Promise<UserDTO[]> {
    const users: DeepPartial<User[]> = await Promise.all(dto.map(mapCreateRequestDTOToUser));

    const existingUsers: User[] = await this.userRepository.find({ where: { email: In(dto.map(u => u.email)) } });
    if (existingUsers.length > 0) {
      throw new BadRequestException("Some emails are not unique or already exists");
    }

    const createdUsers: User[] = await this.userRepository.save(users);
    return createdUsers.map(mapUserToDTO);
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

  async updateRefreshToken(userId: string, refreshToken: string): Promise<string> {
    const hashedToken: string = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, { refresh_token: hashedToken, refreshed_at: new Date() });
    return hashedToken;
  }

  async changePassword(userId: string, newPassword: string, oldPassword: string): Promise<void> {
    const user: User | null = await this.userRepository.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid: boolean =
      (await bcrypt.compare(oldPassword, user.password)) ||
      (user.password === oldPassword && user.password === this.configService.admin.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
  }

  async changeRole(userId: string, role: Role): Promise<void> {
    await this.userRepository.update(userId, { role });
  }

  async bulkDelete(dto: UserBulkDeleteRequestDTO): Promise<void> {
    await this.userRepository.softDelete(dto.user_ids);
  }

  async bulkRestore(dto: UserBulkRestoreRequestDTO): Promise<void> {
    await this.userRepository.restore(dto.user_ids);
  }

  uploadAvatar(file: Express.Multer.File): string {
    return file.path;
  }
}
