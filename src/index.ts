import { Hono } from 'hono'
import { z } from 'zod'
import tasksRouter from './routes/tasks'

const app = new Hono()


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/tasks',tasksRouter)

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

app.onError((err,c)=>{
  console.error(err)
  return c.json({error:'Internal Server Error'},500)
})

app.get('/secret',(c)=>{
  return c.text(c.env.MY_SECRET)
})

export default app
