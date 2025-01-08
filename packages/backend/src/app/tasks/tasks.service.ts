import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskCreateRequestDTO, TaskUpdateRequestDTO } from "@work-solutions-crm/libs/shared/tasks/tasks.api";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/tasks/tasks.dto";
import { Repository } from "typeorm";

import { Task } from "../../models/entities/task.entity";

import { mapTaskToDTO, mapTaskToPreviewDTO } from "./tasks.mappers";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async findAll(): Promise<TaskPreviewDTO[]> {
    const tasks: Task[] = await this.taskRepository.find({ relations: ["user", "project", "users_accountable"] });
    return tasks.map(mapTaskToPreviewDTO);
  }

  async findOne(taskId: string): Promise<TaskDTO> {
    const task: Task | null = await this.taskRepository.findOne({
      where: { task_id: taskId },
      relations: ["user_created", "project", "users_accountable"]
    });
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    return mapTaskToDTO(task);
  }

  async create(dto: TaskCreateRequestDTO): Promise<TaskDTO> {
    const task: Task = this.taskRepository.create({
      ...dto,
      users_accountable: dto.users_accountable.map(({ id }) => ({ user_id: id }))
    });
    const savedTask: Task = await this.taskRepository.save(task);
    return this.findOne(savedTask.task_id);
  }

  async update(taskId: string, dto: TaskUpdateRequestDTO): Promise<TaskDTO> {
    const task: Task = await this.taskRepository.findOneOrFail({ where: { task_id: taskId } });
    Object.assign(taskId, {
      ...dto,
      users_accountable: dto.users_accountable?.map(({ id }) => ({ user_id: id })) ?? task.users_accountable
    });
    const updatedTask: Task = await this.taskRepository.save(task);
    return this.findOne(updatedTask.task_id);
  }

  async delete(taskId: string): Promise<void> {
    await this.taskRepository.softDelete(taskId);
  }

  async restore(taskId: string): Promise<void> {
    await this.taskRepository.restore(taskId);
  }
}
