import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {
  TaskCreateRequestDTO,
  TASKS_ROUTES,
  TasksApi,
  TaskUpdateRequestDTO
} from "@work-solutions-crm/libs/shared/tasks/tasks.api";
import { TaskDTO, TaskPreviewDTO } from "@work-solutions-crm/libs/shared/tasks/tasks.dto";

@Controller()
export class TasksController implements TasksApi {
  @Get(TASKS_ROUTES.findAll())
  findAll(): Promise<TaskPreviewDTO[]> {
    // TODO: Add service logic to fetch all tasks
    return Promise.resolve([]);
  }

  @Get(TASKS_ROUTES.findOne(":taskId"))
  findOne(@Param("taskId") taskId: string): Promise<TaskDTO> {
    // TODO: Add service logic to fetch a single task by ID
    return Promise.resolve(undefined);
  }

  @Post(TASKS_ROUTES.create())
  create(@Body() dto: TaskCreateRequestDTO): Promise<TaskDTO> {
    // TODO: Add service logic to create a new task
    return Promise.resolve(undefined);
  }

  @Patch(TASKS_ROUTES.update(":taskId"))
  update(@Param("taskId") taskId: string, @Body() dto: TaskUpdateRequestDTO): Promise<TaskDTO> {
    // TODO: Add service logic to update a task by ID
    return Promise.resolve(undefined);
  }

  @Delete(TASKS_ROUTES.delete(":taskId"))
  delete(@Param("taskId") taskId: string): Promise<void> {
    // TODO: Add service logic to delete a task by ID
    return Promise.resolve(undefined);
  }

  @Patch(TASKS_ROUTES.restore(":taskId"))
  restore(@Param("taskId") taskId: string): Promise<void> {
    // TODO: Add service logic to restore a task by ID
    return Promise.resolve(undefined);
  }
}
