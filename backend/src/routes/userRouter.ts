import { Hono } from "hono";

export const userRouter = new Hono();

userRouter.post("/signup", (c) => {
  return c.text("post user signup!");
});

userRouter.post("/signin", (c) => {
  return c.text("post user signin!");
});
