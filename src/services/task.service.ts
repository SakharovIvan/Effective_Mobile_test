import Create_Task_DTO from "../dtos/task.create.dto";
import { Task } from "../models/task.model";
import { AppDataSource } from "../data-source";
import { Update_Task_DTO } from "../dtos/task.update.dto";
import { NotFoundException } from "@nestjs/common";
import { Status, Filter } from "../lib/task";
import { Between } from "typeorm";

const TaskRepository = AppDataSource.getRepository(Task);

class TaskService {
  async createTask(create_task_data: Create_Task_DTO): Promise<Task> {
    return TaskRepository.save({
      ...create_task_data,
      status: Status.NEW,
      date_creation: new Date(),
      date_updated: new Date(),
    });
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await TaskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async findAll(filtervalue: Filter = {}): Promise<Task[]> {
    return TaskRepository.find({ where: { ...filtervalue } });
  }

  async findAllByDate(filtervalue: [Date, Date]): Promise<Task[]> {
    return TaskRepository.find({
      where: { date_updated: Between(filtervalue[0], filtervalue[1]) },
    });
  }

  async updateTask(update_task_data: Update_Task_DTO) {
    const consist = await this.findOne(update_task_data.id);
    if (!consist) {
      throw new NotFoundException(
        `Task with ID ${update_task_data.id} not found`
      );
    }

    await TaskRepository.update(update_task_data.id, {
      ...update_task_data,
      date_updated: new Date(),
    });
    return this.findOne(update_task_data.id);
  }
}
export default new TaskService();
