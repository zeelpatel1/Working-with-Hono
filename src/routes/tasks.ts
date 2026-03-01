import z from "zod";
import { Hono } from "hono";

const tasksRouter=new Hono()

const taskSchema=z.object({
    title:z.string().min(1)
  })
  
type Task= {
    id:number,
    title:string
}

type Tasks=Task[];

const tasks:Tasks=[];


tasksRouter.use("*",async(c,next)=>{
    const authHeader=c.req.header('Authorization')
    if(authHeader !== "Bearer 1234"){{return c.json({error:'Unauthorized'},401)}}
    await next()
})

tasksRouter.get('/',(c)=>{
    return c.json(tasks)
})

tasksRouter.post('/', async (c) => {
    const { title } = await c.req.json();
  
    const validateData = taskSchema.safeParse({ title });
  
    if(!validateData.success){
      return c.json({error:validateData.error.message},400)
    }
    const newTask:Task={
      id:tasks.length+1,
      title
    }
  
    tasks.push(newTask) 
  
    return c.json(newTask)
  
  })
  
  tasksRouter.delete('/:id',(c)=>{
    const id=Number(c.req.param('id'))
  
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1){
      return c.json({error:'Task not found'},404)
    }
  
    tasks.splice(index,1)
    return c.json({message:'Task deleted successfully'},200)
  
})

export default tasksRouter;