import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLogDTO } from "@work-solutions-crm/libs/shared/user-log/user-log.dto";
import { Repository } from "typeorm";

import { UserLog } from "../../models/entities/user-log.entity";

import { mapUserLogToDTO } from "./user-log.mappers";

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>
  ) {}

  async findAll(userId: string): Promise<UserLogDTO[]> {
    const userLogs: UserLog[] = await this.userLogRepository.find({
      where: { affected_user: { user_id: userId } },
      relations: ["user", "affected_user"],
      order: { created_at: "ASC" }
    });
    return userLogs.map(mapUserLogToDTO);
  }
}
