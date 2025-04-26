import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./models/task.model"
import dotenv from "dotenv";

dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Task],
})

AppDataSource.initialize()
    .then(() => {
        console.log('DB connected')
    })
    .catch((error) => console.log(error))
