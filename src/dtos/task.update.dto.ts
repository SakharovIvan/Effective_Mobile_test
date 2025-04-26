import { Status, Task } from "../lib/task";

export class Update_Task_DTO {
  id: number;
  status?: Status;
  theme?: string;
  message?: string;
  compete_message?: string;
  canceled_message?: string;
  date_creation?: Date;
  date_updated?: Date;
  constructor(model: Task) {
    this.id = model.id;
    this.status = model.status;
    this.theme = model.theme;
    this.message = model.message;
    this.compete_message = model.compete_message;
    this.canceled_message = model.canceled_message;
  }
}
