import express from "express";
import TaskCotroller from "./controllers/task.controller";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()) 

//Create task (Status: Новое)
app.post("/tasks", TaskCotroller.createTask);

//Update task status (Status: В работе, завершено, отменено)
app.put("/tasks/:id/:status", TaskCotroller.updateTask);

//Get task by id
app.get("/tasks/find/:id", TaskCotroller.findTaskById);
//Get all tasks
app.get("/tasks", TaskCotroller.findTaskById);
app.get("/tasks/date", TaskCotroller.listTasksByDate);

//Cancell all tasks (Status "В работе"->"Отменено")
app.put("/cancel/tasks", TaskCotroller.cancelAllTasks);

app.listen(port)
console.log(`Server listening on port ${port}`)
