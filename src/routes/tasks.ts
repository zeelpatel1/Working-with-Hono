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




tasksRouter.use("*",async(c,next)=>{
    const authHeader=c.req.header('Authorization')
    if(authHeader !== "Bearer 1234"){{return c.json({error:'Unauthorized'},401)}}
    await next()
})

tasksRouter.get('/',async(c)=>{
    const {results}=await c.env.tasks_db.prepare("SELECT * FROM tasks").run()
    return c.json(results)
})

tasksRouter.post('/', async (c) => {
    const { title } = await c.req.json();
  
    const validateData = taskSchema.safeParse({ title });
  
    if(!validateData.success){
      return c.json({error:validateData.error.message},400)
    }
    
    const result=await c.env.tasks_db.prepare("INSERT INTO tasks (title) VALUES (?)").bind(title).run()
  
    return c.json({
        sucess:true,
        id:result.meta.last_row_id,
        title
    })
  
  })
  
  tasksRouter.delete('/:id',async(c)=>{
    const id=Number(c.req.param('id'))
  
    const result=await c.env.tasks_db.prepare("DELETE FROM tasks where id= ?").bind(id).run()

    if(result.meta.changes===0){
        return c.json({error:"Task not found"},404)
    }

    return c.json({message:"Task deleted successfully"})
  
})

export default tasksRouter;