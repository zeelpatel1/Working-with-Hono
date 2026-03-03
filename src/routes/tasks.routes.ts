import { Hono } from "hono"
import * as controller from "../controller/tasks.controller"

const tasksRouter = new Hono()

tasksRouter.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization")
  if (authHeader !== "Bearer 1234") {
    return c.json({ error: "Unauthorized" }, 401)
  }
  await next()
})

tasksRouter.get("/", controller.getAllTasks)
tasksRouter.post("/", controller.createNewTask)
tasksRouter.delete("/:id", controller.deleteTaskById)
tasksRouter.put("/:id", controller.updateTaskById)

export default tasksRouter