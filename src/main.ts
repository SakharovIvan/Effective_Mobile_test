import express, {Request,Response} from 'express'

const app = express()
const port = process.env.PORT|| 3000 


//Create task (Status: Новое)
app.post('/tasks',(req:Request,res:Response)=>{
    
})


//Update task status (Status: В работе, завершено, отменено)
app.put('/tasks:id',(req:Request,res:Response)=>{
    
})

//Get all 
app.get('/tasks:id',(req:Request,res:Response)=>{
    
})


//Cancell all tasks (Status "В работе"->"Отменено")
app.put('/tasks/CancelAll',(req:Request,res:Response)=>{
    
})