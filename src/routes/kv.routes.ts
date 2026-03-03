import { Hono } from "hono";

const kvRouter=new Hono()

kvRouter.post("/set/:key/:value",async(c)=>{
    const key=c.req.param("key")
    const value=c.req.param("value")

    await c.env.USERS_NOTIFICATION_CONFIG.put(key,value)
    return c.text("Saved")
})

kvRouter.get("/get/:key",async(c)=>{
    const key=c.req.param("key")

    const value=await c.env.USERS_NOTIFICATION_CONFIG.get(key)
    return c.text(value || 'Not Found')
})

export default kvRouter