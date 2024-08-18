import { createBlogSchema, updateBlogSchema } from "@ekanshk/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const headers = c.req.header("Authorization");

  if (!headers || !headers.startsWith("Bearer")) {
    c.status(401);
    return c.json({
      msg: "unauthorized",
    });
  }

  const token = headers.split(" ")[1];

  try {
    const verified_user = await verify(token, c.env.JWT_SECRET);

    if (verified_user.userId) {
      c.set("userId", verified_user.userId.toString());
      await next();
    } else {
      c.status(403);
      return c.json({ msg: "unauthorized" });
    }
  } catch (error) {
    c.status(401);
    return c.json({
      msg: "unauthorized",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  try {
    const parsedBody = createBlogSchema.safeParse(body);

    if (!parsedBody.success) {
      c.status(400);
      return c.json({
        msg: "Invalid Inputs",
      });
    }

    const post = await prisma.post.create({
      data: {
        title: parsedBody.data.title,
        content: parsedBody.data.content,
        authorId: authorId,
      },
    });

    return c.json({ id: post.id });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "error creating new post" });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");

  try {
    const parsedBody = updateBlogSchema.safeParse(body);

    if (!parsedBody.success) {
      c.status(400);
      return c.json({
        msg: "Invalid Inputs",
      });
    }

    const post = await prisma.post.update({
      where: {
        id: parsedBody.data.id,
        authorId: authorId,
      },
      data: {
        title: parsedBody.data.title,
        content: parsedBody.data.content,
      },
    });

    return c.json({ id: post.id, msg: "post updated" });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "error updating post" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          published: "desc",
        },
      ],
    });
    return c.json(posts);
  } catch (error) {
    c.status(500);
    return c.json({ msg: "error fetching posts" });
  }
});

blogRouter.get("/my-blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  console.log(userId);

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      }, select: {
        title: true,
        content: true,
        published: true,
        id: true,
        authorId: true,
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        {
          published: "desc"
        }
      ]
    });

    if (!posts) {
      c.status(422);
      return c.json({
        msg: "no blogs found",
      });
    }

    return c.json(posts);
  } catch (error) {
    c.status(500);
    return c.json({
      msg: "error fetching your blogs...",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
        authorId: true,
      },
    });

    return c.json(post);
  } catch (error) {
    c.status(500);
    return c.json({ msg: "error fetching post" });
  }
});

blogRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  const userId = c.get("userId");

  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!existingPost) {
      c.status(403);
      return c.json({
        msg: "No such blog exists",
      });
    } else if (existingPost.authorId != userId) {
      c.status(403);
      return c.json({
        msg: "Post does not belong to you",
      });
    }

    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
      select: {
        id: true,
      },
    });

    return c.json({ id: post.id, msg: "Blog post deleted" });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: "error deleting blog post",
    });
  }
});
