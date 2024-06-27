import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{ Bindings: { DATABASE_URL: string, JWT_SECRET: string } }>();

userRouter.post("/signup", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
  
    const token = await sign({userId: user.id}, c.env.JWT_SECRET);
  
    return c.json({token})

  } catch (error) {
    c.status(401)
    return c.json({msg: "error while signing up"});
  }

});

userRouter.post("/signin", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!user) {
      c.status(403);
      return c.json({
        msg: "no such user found"
      })
    } 

    const token = await sign({userId: user.id}, c.env.JWT_SECRET)
    return c.json({token})

  } catch (error) {
    
    c.status(403);
    return c.json({
      msg: "email or password wrong"
    })
  }
});
