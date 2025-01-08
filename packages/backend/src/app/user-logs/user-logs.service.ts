import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-logs/user-logs.dto";
import { Repository } from "typeorm";

import { UserLog } from "../../models/entities/user-log.entity";

import { mapUserLogToDTO } from "./user-logs.mappers";

@Injectable()
export class UserLogsService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>
  ) {}

  async findAll(userId: string): Promise<UserLogDTO[]> {
    const userLogs: UserLog[] = await this.userLogRepository.find({
      where: { user: { user_id: userId } },
      relations: ["user"]
    });
    return userLogs.map(mapUserLogToDTO);
  }
}
