export type Task = {
  id?: number;
  status: Status;
  theme: string;
  message: string;
  compete_message: string;
  canceled_message: string;
  date_creation:string;
  date_updated:string
};
export type Filter={
    status?:Status;
    date_creation?:Date;
    date_updated?:Date
} 
export enum Status {
  NEW = "Новое",
  INPROGRESS = "В работе",
  COMPLETED = "Завершено",
  CANCELED = "Отменено",
}