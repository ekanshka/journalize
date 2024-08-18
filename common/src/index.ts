import zod from 'zod'

// zod schemas for backend, types for frontend

export const signupSchema = zod.object({
    email: zod.string().email(),
    name: zod.string().optional(),
    password: zod.string().min(6, {message: "Password must be atleast 6 characters"})
})

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6, {message: "Password must be atleast 6 characters"})
})

export const createBlogSchema = zod.object({
    title: zod.string().min(5, {message: "Title is too short"}),
    content: zod.string().min(10, {message: "Content is too short!"})
})

export const updateBlogSchema = zod.object({
    id: zod.string(),
    title: zod.string().min(5, {message: "Title is too short"}),
    content: zod.string().min(10, {message: "Content is too short!"})
})

export type SignupSchema = zod.infer<typeof signupSchema>
export type SigninSchema = zod.infer<typeof signinSchema>
export type CreateBlogSchema = zod.infer<typeof createBlogSchema>
export type UpdateBlogSchema = zod.infer<typeof updateBlogSchema>