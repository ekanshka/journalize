import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<
{ 
  Bindings: { 
    DATABASE_URL: string; 
    JWT_SECRET: string;
  }, 
  Variables: { 
    userId: string;
  } 
}>();

blogRouter.use('/*', async (c, next) => {
  const headers = c.req.header('Authorization');

  if (!headers || !headers.startsWith('Bearer')) {
    c.status(401);
    return c.json({ 
      msg: "unauthorized"
    })
  }

  const token = headers.split(' ')[1];

  try {

    const verified_user = await verify(token, c.env.JWT_SECRET);

    if (verified_user.userId){
      c.set("userId", verified_user.userId.toString());
      await next();
    } else {
      c.status(403)
      return c.json({msg: "unauthorized"})
    }

  } catch (error) {
    c.status(403);
      return c.json({ 
        msg: "unauthorized"
      })
  }

})

blogRouter.post("/", async (c) => {

  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId
      }
    })

    return c.json({id: post.id});

  } catch (error) {
    c.status(500)
    return c.json({msg: "error creating new post"});
    
  }

});

blogRouter.put("/", async (c) => {

  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const authorId = c.get("userId");

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published
      }
    })

    return c.json({msg: "post updated"});

  } catch (error) {
    c.status(500)    
    return c.json({msg: "error updating post"})
  }
});

blogRouter.get("/bulk", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({});
    return c.json(posts);

  } catch (error) {
    c.status(500)
    return c.json({msg: "error fetching posts"})
  }
});

blogRouter.get("/:id", async (c) => {

  const blogId = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId
      }
    })

    return c.json(post);

  } catch (error) {
    c.status(500)
    return c.json({msg: "error fetching post"})
  }

});


