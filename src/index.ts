import { Hono } from "hono"
import { cors } from "hono/cors"
import tasksRouter from "./routes/tasks.routes"
import kvRouter from "./routes/kv.routes"

const app = new Hono()

app.use("*", cors())

app.get("/", (c) => c.text("Hello Hono!"))

app.route("/tasks", tasksRouter)
app.route('/kv',kvRouter)

app.notFound((c) => c.json({ error: "Not Found" }, 404))

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: "Internal Server Error" }, 500)
})

export default app