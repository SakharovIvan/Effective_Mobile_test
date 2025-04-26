# Effective Mobile test project

## Steps to run this project:

1. Run `npm install` command
2. Create `.env` file with

```
PORT=3001
DB_NAME=fortest
DB_PASSWORD=root
DB_USERNAME=root
```

2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## How to use

1. Create new Task
   Sent a HTTP `POST` request `http://localhost:3001/tasks`
   with body:

   ```
   {
       "theme":"theme example",
       "message":"message example"
   }
   ```

   Where:
   |key|description|necessarily
   |---| --|--|
   |theme| theme of your task|+|
   |message| Message of your task|+|

   _Response:_

```
{
    "theme": "theme example",
    "message": "message example",
    "status": "Новое",
    "date_creation": "2025-04-26T11:22:52.526Z",
    "date_updated": "2025-04-26T11:22:52.526Z",
    "compete_message": null,
    "canceled_message": null,
    "id": 7
}
```

Where:
|key|description|
|---| --|
|theme|theme of your task|
|message|message of your task|
|status|status of your task|
|date_creation|date creation of your task|
|date_updated|date updated of your task|
|compete_message|compete message of your task|
|canceled_message|canceled message of your task|
|id|id of your task|

2. Take task inprogress
   Sent a HTTP `PUT` request `http://localhost:3001/tasks/:id/inprogress` where id - id of your task
   example: `http://localhost:3001/tasks/7/inprogress`

   _Response:_

```
{
    "id": 7,
    "status": "В работе",
    "theme": "theme example",
    "message": "message example",
    "compete_message": null,
    "canceled_message": null,
    "date_creation": "2025-04-26T11:22:52.526Z",
    "date_updated": "2025-04-26T11:33:23.975Z"
}
```

3. Comlete task
   Sent a HTTP `PUT` request `http://localhost:3001/tasks/:id/completed` where id - id of your task
   example: `http://localhost:3001/tasks/7/completed`
   can be body with comlete message: `{"compete_message":"Example compete_message"}`

_Response:_

```
{
    "id": 7,
    "status": "Завершено",
    "theme": "theme example",
    "message": "message example",
    "compete_message": "Example compete_message",
    "canceled_message": null,
    "date_creation": "2025-04-26T11:22:52.526Z",
    "date_updated": "2025-04-26T11:35:41.473Z"
}
```

Extension: if user sents msg for body requset with `"canceled_message"` - response will be ` {
    "msg": "Не соответсвует статус причине закрытия обращения"
}`

4. Cancel task
   Sent a HTTP `PUT` request `http://localhost:3001/tasks/:id/canceled` where id - id of your task
   example: `http://localhost:3001/tasks/7/canceled`
   can be body with comlete message: `{"canceled_message":"Example canceled_message"}`

_Response:_

```
{
    "id": 7,
    "status": "Отменено",
    "theme": "theme example",
    "message": "message example",
    "compete_message": null,
    "canceled_message":"Example canceled_message",
    "date_creation": "2025-04-26T11:22:52.526Z",
    "date_updated": "2025-04-26T11:35:41.473Z"
}
```

Extension: if user sents msg for body requset with `"completed_message"` or if task was closed - response will be ` {
    "msg": "Не соответсвует статус причине закрытия обращения"
}`

5. Get all tasks, filters by last date task update

- Sent a HTTP `GET` request `http://localhost:3001/tasks` to get all tasks
- Sent a HTTP `GET` request `http://localhost:3001/tasks/find/:id` where id - id of your task to get info of this task
- Sent a HTTP `GET` request `http://localhost:3001/tasks/date?start=YYYY-MM-DD&end=YYYY-MM-DD` where start - date from you want filter, end - day ends to get all tasks by `date_updated` paremeter. \
  Or you can sent `GET` request `http://localhost:3001/tasks/date?start=YYYY-MM-DD` to get only start date tasks\
  _Example: `http://localhost:3001/tasks/date?start=2025-04-25`_

6. Cancel all tasks in progress
   Sent a HTTP `PUT` request `http://localhost:3001/cancel/tasks` to cancel all tasks in progress.\
   _Success response:_
   ```
   {
    msg: "Задачи отменены"
    }
   ```
