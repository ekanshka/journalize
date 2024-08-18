import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinSchema, signupSchema } from "@ekanshk/medium-common";

export const userRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const parsedBody = signupSchema.safeParse(body);

    if (!parsedBody.success) {
      c.status(400);
      return c.json({
        msg: "Invalid inputs",
      });
    }

    const existing_user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.email,
      },
    });

    if (existing_user) {
      c.status(400);
      return c.json({ msg: "the user already exists, signin instead" });
    }

    const user = await prisma.user.create({
      data: {
        email: parsedBody.data.email,
        name: parsedBody.data.name,
        password: parsedBody.data.password,
      },
    });

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json({ token });
  } catch (error) {
    c.status(401);
    return c.json({ msg: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const parsedBody = signinSchema.safeParse(body);

    if (!parsedBody.success) {
      c.status(401);
      return c.json({
        msg: "Invalid inputs",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.email,
        password: parsedBody.data.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        msg: "no such user found or wrong password",
      });
    }

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.status(403);
    return c.json({
      msg: "email or password wrong",
    });
  }
});

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ msg: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const validUser = await verify(token, c.env.JWT_SECRET) as {userId: string} || ""

    if (!validUser) {
      c.status(401);
      return c.json({msg: "unauthorized"})
    }

    const user = await prisma.user.findUnique({
      where: {
        id: validUser.userId
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return c.json(user);

  } catch (error) {
    c.status(401);
    return c.json({msg: "unauthorized"})
  }
});
