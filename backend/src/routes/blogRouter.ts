import { Hono } from "hono";

export const blogRouter = new Hono();

blogRouter.post("/", (c) => {
  return c.text("post blog!");
});

blogRouter.put("/", (c) => {
  return c.text("put blog!");
});

blogRouter.get("/:id", (c) => {
    const blogId = c.req.param('id');
  return c.text(`get blog ${blogId}!`);
});

blogRouter.get("/bulk", (c) => {
  return c.text("get blog bulk!");
});
