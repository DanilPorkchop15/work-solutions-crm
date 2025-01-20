// controllers/task.controller.ts

import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  TaskApi,
  TaskCreateRequestDTO,
  TASKS_ROUTES,
  TaskUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/task/task.api";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/task/task.dto";

import { TaskService } from "./task.service";

@Controller()
export class TaskController implements TaskApi {
  constructor(private readonly tasksService: TaskService) {}

  @Get(TASKS_ROUTES.findAll())
  async findAll(): Promise<TaskPreviewDTO[]> {
    return this.tasksService.findAll();
  }

  @Get(TASKS_ROUTES.findOne(":taskId"))
  async findOne(@Param("taskId") taskId: string): Promise<TaskDTO> {
    return this.tasksService.findOne(taskId);
  }

  @Post(TASKS_ROUTES.create())
  async create(@Body() dto: TaskCreateRequestDTO): Promise<TaskDTO> {
    return this.tasksService.create(dto);
  }

  @Patch(TASKS_ROUTES.update(":taskId"))
  async update(@Param("taskId") taskId: string, @Body() dto: TaskUpdateRequestDTO): Promise<TaskDTO> {
    return this.tasksService.update(taskId, dto);
  }

  @Delete(TASKS_ROUTES.delete(":taskId"))
  async delete(@Param("taskId") taskId: string): Promise<void> {
    return this.tasksService.delete(taskId);
  }

  @Patch(TASKS_ROUTES.restore(":taskId"))
  async restore(@Param("taskId") taskId: string): Promise<void> {
    return this.tasksService.restore(taskId);
  }
}
