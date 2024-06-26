import { Hono } from "hono";
import { signup } from "../controllers/userController";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = new Hono<{ Bindings: { DATABASE_URL: string } }>();

userRouter.post("/signup", (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text(`post user signup! ${c.env.DATABASE_URL}`);
});

userRouter.post("/signin", (c) => {
  return c.text("post user signin!");
});
