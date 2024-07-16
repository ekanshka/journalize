import zod from 'zod'

// zod schemas for backend, types for frontend

export const signupSchema = zod.object({
    email: zod.string().email(),
    name: zod.string().optional(),
    password: zod.string().min(6)
})

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const createBlogSchema = zod.object({
    title: zod.string(),
    content: zod.string()
})

export const updateBlogSchema = zod.object({
    id: zod.string(),
    title: zod.string(),
    content: zod.string(),
    published: zod.boolean().optional()
})

export type SignupSchema = zod.infer<typeof signupSchema>
export type SigninSchema = zod.infer<typeof signinSchema>
export type CreateBlogSchema = zod.infer<typeof createBlogSchema>
export type UpdateBlogSchema = zod.infer<typeof updateBlogSchema>