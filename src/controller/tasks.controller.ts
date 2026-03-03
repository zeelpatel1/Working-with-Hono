import { z } from "zod"
import * as taskService from "../services/tasks.services"

const taskSchema = z.object({
  title: z.string().min(1)
})

export const getAllTasks = async (c: any) => {
  const limit = Number(c.req.query("limit") ?? 10)
  const offset = Number(c.req.query("offset") ?? 0)

  if (isNaN(limit) || isNaN(offset)) {
    return c.json({ error: "Invalid pagination" }, 400)
  }

  const { results } = await taskService.getTask(c.env.tasks_db, limit, offset)
  return c.json(results)
}

export const createNewTask = async (c: any) => {
  const body = await c.req.json()
  const validated = taskSchema.safeParse(body)

  if (!validated.success) {
    return c.json({ error: validated.error.message }, 400)
  }

  const result = await taskService.createTask(c.env.tasks_db, body.title)

  return c.json({
    success: true,
    id: result.meta.last_row_id,
    title: body.title
  })
}

export const deleteTaskById = async (c: any) => {
  const id = Number(c.req.param("id"))

  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400)
  }

  const result = await taskService.deleteTask(c.env.tasks_db, id)

  if (result.meta.changes === 0) {
    return c.json({ error: "Task not found" }, 404)
  }

  return c.json({ message: "Task deleted" })
}

export const updateTaskById = async (c: any) => {
  const id = Number(c.req.param("id"))
  const body = await c.req.json()

  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400)
  }

  const validated = taskSchema.safeParse(body)
  if (!validated.success) {
    return c.json({ error: validated.error.message }, 400)
  }

  const result = await taskService.updateTask(c.env.tasks_db, id, body.title)

  if (result.meta.changes === 0) {
    return c.json({ error: "Task not found" }, 404)
  }

  return c.json({ message: "Task updated" })
}