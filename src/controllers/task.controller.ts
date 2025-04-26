import TaskService from "../services/task.service";
import { Request, Response } from "express";
import Create_Task_DTO from "../dtos/task.create.dto";
import { Update_Task_DTO } from "../dtos/task.update.dto";
import { Status } from "../lib/task";
import { createDateFromString } from "../lib/dates";

class TaskCotroller {
  async createTask(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const { theme, message } = body;
    const newTask = new Create_Task_DTO(theme, message);
    res.json(await TaskService.createTask(newTask));
    return;
  }

  async listTasksByDate(req: Request, res: Response): Promise<any> {
    const { start, end } = req.query;
    let startDate: Date;
    let endDate: Date;

    if (typeof start === "string" || typeof start === "number") {
      startDate = createDateFromString(start);
      if (!end) {
        endDate = createDateFromString(start, 1);
      }
    }

    if (typeof end === "string" || typeof end === "number") {
      endDate = createDateFromString(end,1);
    }

    res.json(await TaskService.findAllByDate([startDate, endDate]));
    return;
  }

  async updateTask(req: Request, res: Response): Promise<any> {
    const { body } = req;
    const id = Number(req.params.id);
    const newTask = new Update_Task_DTO({
      id,
      ...body,
      status: Status[req.params.status.toUpperCase()],
    });
    if (
      (newTask.status === Status.CANCELED && !newTask.compete_message) ||
      (newTask.status === Status.COMPLETED && !newTask.canceled_message) ||
      (newTask.status === Status.INPROGRESS &&
        !newTask.canceled_message &&
        !newTask.compete_message)
    ) {
      res.json(await TaskService.updateTask(newTask));
    } else {
      res.json({ msg: "Не соответсвует статус причине закрытия обращения" });
    }
    return;
  }
  async cancelAllTasks(req: Request, res: Response): Promise<any> {
    const tasksList = await TaskService.findAll({ status: Status.INPROGRESS });
    const promises = tasksList.map((el) => {
      TaskService.updateTask({ ...el, status: Status.CANCELED });
    });
    Promise.all(promises).then(() => res.json({ msg: "Задачи отменены" }));
    return;
  }

  async findTaskById(req: Request, res: Response): Promise<any> {
    const taskID = Number(req.params.id);
    if (!taskID) {
      res.json(await TaskService.findAll());
      return;
    }
    res.json(await TaskService.findOne(taskID));
    return;
  }
}

export default new TaskCotroller();
